const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
  student: String,
  homework: Array,
  quiz: Array,
  extraCredit: Number
});

module.exports = mongoose.model('score', scoreSchema);
