/*
 * Npm import
 */
const mongoose = require('mongoose');
/*
 * Local import
 */
const Score = require('../models/matchModelv2');

 //bdd connection
 const mongoDB = `mongodb://vincent:${process.env.DB_PASS}@ds113749.mlab.com:13749/battlerite-api`;
 mongoose.connect(mongoDB);
 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'mongoDB connection error: '));
 db.once('open', () => {
   console.log('Connected to the DB');
 });

module.exports = function getBddDatas (req, res) {
  // const newScore = new Score({
  //   student: "Toto",
  //   homework: [ 10, 5, 10 ],
  //   quiz: [ 10, 8 ],
  //   extraCredit: 10
  //   }
  // );
  //
  // newScore.save((err, savedScore) => {
  //   if (err) {
  //     console.error(err);
  //     return err;
  //   }
  //   // console.log(savedScore);
  // });



  const test = db.collection('scores').aggregate([
      { $match: { "student": "Toto" } },
      { $group: { _id: 2, total: { $sum: "extraCredit" } } },
      { $sort: { total: -1 } }
      ]).toArray(function(err, results) {
      console.log(results);
    });



  res.send('data sent in bdd');
};
