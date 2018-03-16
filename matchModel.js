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
  participantsRoster2: Array,
  participant1Roster1Champion: Object,
  participant2Roster1Champion: Object,
  participant3Roster1Champion: Object,
  participant1Roster2Champion: Object,
  participant2Roster2Champion: Object,
  participant3Roster2Champion: Object,
});

module.exports = mongoose.model('match', matchSchema);
