const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
  type: String,
  id: String,
  createdAt: String,
  duration: Number,
  mapID: String,
  gameType: String,
  rankingType: String,
  serverType: String,
  roster1Id: String,
  roster2Id: String,
  participantsRoster1: Array,
});

module.exports = mongoose.model('match', matchSchema);
