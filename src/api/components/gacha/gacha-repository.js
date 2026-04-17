const { GachaLog, Prize } = require('../../../models');

async function countTodayGacha(userId, start, end) {
  return GachaLog.countDocuments({
    userId,
    createdAt: { $gte: start, $lte: end },
  });
}

async function getAvailPrizes() {
  return Prize.find({ quota: { $gt: 0 } });
}

async function getAllPrizes() {
  return Prize.find({});
}

async function getWinners() {
  return GachaLog.find({ isWin: true })
    .populate('userId')
    .populate('prizeId')
    .sort({ createdAt: -1 });
}

async function decreaseQuota(prizeId) {
  return Prize.updateOne(
    { _id: prizeId, quota: { $gt: 0 } },
    { $inc: { quota: -1 } }
  );
}

async function createGachaLog(userId, prizeId, isWin) {
  return GachaLog.create({ userId, prizeId, isWin, createdAt: new Date() });
}

async function getGachaLog(userId) {
  return GachaLog.find({ userId }).populate('prizeId');
}

module.exports = {
  countTodayGacha,
  getAvailPrizes,
  getAllPrizes,
  getWinners,
  decreaseQuota,
  createGachaLog,
  getGachaLog,
};
