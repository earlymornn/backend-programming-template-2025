const gachaRepository = require('./gacha-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function playGacha(userId) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const totalToday = await gachaRepository.countTodayGacha(userId, start, end);

  if (totalToday >= 5) {
    throw errorResponder(
      errorTypes.UNPROCESSABLE_ENTITY,
      'Kesempatan gacha sudah habis!'
    );
  }

  const prizes = await gachaRepository.getAvailPrizes();

  if (prizes.length === 0) {
    await gachaRepository.createGachaLog(userId, null, false);

    return {
      message: 'Hadiah tidak tersedia.',
      isWin: false,
    };
  }

  const randomIndex = Math.floor(Math.random() * prizes.length);
  const selectedPrize = prizes[randomIndex];

  await gachaRepository.decreaseQuota(selectedPrize._id);

  const result = await gachaRepository.decreaseQuota(selectedPrize._id);

  if (result.modifiedCount === 0) {
    return {
      message: 'Hadiah sudah habis, coba lagi.',
      isWin: false,
    };
  }

  await gachaRepository.createGachaLog(userId, selectedPrize._id, true);

  return {
    message: 'Selamat, kamu mendapatkan hadiah!',
    isWin: true,
    prize: selectedPrize.name,
  };
}

async function getWinners() {
  const data = await gachaRepository.getWinners();

  return data.map((item) => {
    const fullName = item.userId?.fullName || 'Unknown';
    const anonym = fullName
      .split(' ')
      .map((word) => {
        if (word.length <= 2) return word[0] + '*';
        return word[0] + '*'.repeat(word.length - 2) + word[word.length - 1];
      })
      .join(' ');

    return {
      name: anonym,
      prize: item.prizeId ? item.prizeId.name : null,
    };
  });
}

async function getPrizes() {
  return gachaRepository.getAllPrizes();
}

async function getGachaLog(userId) {
  return gachaRepository.getGachaLog(userId);
}

module.exports = {
  playGacha,
  getWinners,
  getPrizes,
  getGachaLog,
};
