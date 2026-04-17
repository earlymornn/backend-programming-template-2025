module.exports = (db) =>
  db.model(
    'GachaLog',
    db.Schema({
      userId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Users',
      },
      prizeId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Prize',
        default: null,
      },
      isWin: Boolean,
      createdAt: Date,
    })
  );
