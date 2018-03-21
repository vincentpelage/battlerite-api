// Package import
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Champion = require('./models/champion');


// Init variable
const app = express();
const key = process.env.KEY_API_BATTLERITE;

const mongoDB = `mongodb://localhost/champion_test`;
mongoose.connect(mongoDB);
// lancer et stocker la connexion
const db = mongoose.connection;
// tester la connexion
db.on('error', console.error.bind(console, 'mongoDB connection error: '));
db.once('open', () => {
  console.log('Connected to the DB');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/', (req, res) => {
  const date = new Date();
  const newChampion = new Champion({
    season: 6,
    createdAt: 'blabla',
    date: date.toISOString(),
    gameType: 'LEAGUE3V3',
    league: 3,
    matchRegion: 'south_america',
    actor: 44962063,
    role: 'support',
    abilityUses: 325,
    attachment: 1664301717,
    damageDone: 1303,
    damageReceived: 1485,
    deaths: 1,
    disablesDone: 324,
    disablesReceived: 549,
    emote: 101490584,
    energyGained: 893,
    energyUsed: 600,
    healingDone: 1213,
    healingReceived: 867,
    kills: 4,
    mount: 828373934,
    outfit: 246263357,
    score: 2840,
    side: 2,
    timeAlive: 438,
    teammate1: 111,
    teammate2: 222,
    opponent1: 333,
    opponent2: 444,
    opponent3: 555,
    gameResult: 1,
    pickRate,
  });
  newChampion.save((err, savedChampion) => {
    if (err) {
      console.error(err);
      return err;
    }
    console.log(savedChampion);
  });

});

app.get('/sum', (req, res) => {


  db.collection('champions')
  .findOne({'actor': 44962063},
    (err, result) => {
      if(err){
        console.log(err);
      }
      console.log(result);
    });

    db.collection('champions')
      .find({'actor': 44962063})
        .toArray((err, results) => {
          if(err){
            console.log(err);
          }
          console.log(results);
        });

    db.collection('champions').aggregate([
      { $match: { 'actor': 44962063 } },
      { $group: { _id: null, total: { $sum: '$kills' } } },
      { $sort: { total: -1 } }
    ]).toArray((err, results) => {
        if(err){
          console.log(err);
        }
        console.log(results);
      });

    db.collection('champions').aggregate([
      {
        $match: {
          $and: [
            { 'actor': 44962063 },
            { 'teammate1': 111 },
            { 'teammate2': 222 },
            { 'gameType': 'LEAGUE3V3' },
          ]
        }
      },
      { $group: { _id: null, total: { $sum: '$kills' } } },
      { $sort: { total: -1 } }
    ]).toArray((err, results) => {
        if(err){
          console.log(err);
        }
        console.log(results);
      });


});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);
