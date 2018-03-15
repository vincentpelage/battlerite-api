// Package import
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');

const fakeData = require('./fakeData');
const Match = require('./matchModel');

// Init variable
const app = express();
const key = process.env.KEY_API_BATTLERITE;

const mongoDB = `mongodb://vincent:${process.env.DB_PASS}@ds113749.mlab.com:13749/battlerite-api`;
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

// app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Title-Id, Authorization');
//   next();
// });


app.get('/', (req, res) => {
  let urlListMatchTest = 'https://api.dc01.gamelockerapp.com/shards/global/matches?filter[createdAt-start]=2018-03-07T14:25:30Z&page[limit]=5&page[offset]=5&sort=createdAt';
  let singleMatch = 'https://api.dc01.gamelockerapp.com/shards/global/matches/FEF36D129DDA4B738B6C50C253279A19';
  // let urlRosterTest = 'https://api.dc01.gamelockerapp.com/shards/global/rosters/id=6c60ad2c-392b-41c0-a32a-2686715695d9';
  let config = {};
  config.headers = {
    'Accept-Encoding': 'gzip',
    'Authorization': key,
    'Accept': 'application/vnd.api+json'
  }

  axios
    .get(singleMatch, config)
    .then((response) => {

      async function GetAllMatches(response){
        try {
          const matches = await
            response.data;
          return matches;
        }
        catch(error) {
          console.log(error.response)
        }
      }

      GetAllMatches(response).then( function(result) {
          res.json(result);
      });

    })
    .catch((error) => {
      console.log(error.response)
    });





})

app.get('/test-vincent', (req, res) => {
  let urlListMatchTest = 'https://api.dc01.gamelockerapp.com/shards/global/matches?filter[createdAt-start]=2018-03-03T14:25:30Z&page[limit]=1&page[offset]=5&sort=createdAt';
  let player = 'https://api.dc01.gamelockerapp.com/shards/global/players/951488175786881024';
  // let urlRosterTest = 'https://api.dc01.gamelockerapp.com/shards/global/rosters/id=6c60ad2c-392b-41c0-a32a-2686715695d9';
  let config = {};
  config.headers = {
    'Accept-Encoding': 'gzip',
    'Authorization': key,
    'Accept': 'application/vnd.api+json'
  }

  axios
    .get(urlListMatchTest, config)
    .then((response) => {

      async function GetAllMatches(response){
        try {
          const matches = await
            response.data;
          return matches;
        }
        catch(error) {
          console.log(error.response)
        }
      }

      GetAllMatches(response).then( function(result) {
          res.json(result);
      });

    })
    .catch((error) => {
      console.log(error.response)
    });
});

// Test on fake data

app.get('/test-fake-data', (req, res) => {

  fakeData.data.map(match => {

    async function GetAllParticipantsRoster1(fakeData){
      try {
        const allParticipants = await
          fakeData.included.filter(function( obj ) {
              return obj.type == 'roster' && obj.id == roster1;
            });
        return allParticipants[0].relationships.participants.data;
      }
      catch(error) {
        console.log(error.response)
      }
    }

    const { type, id } = match;
    const { createdAt, duration } = match.attributes;
    const { mapID } = match.attributes.stats;
    const gameType = match.attributes.stats.type;
    const { rankingType, serverType } = match.attributes.tags;
    const roster1 = match.relationships.rosters.data[0].id;
    const roster2 = match.relationships.rosters.data[1].id;
    const idPlayer = fakeData.included[0].id;
    const participantsRoster1 =
      GetAllParticipantsRoster1(fakeData).then( function(participants) {
        // console.log(participants);
        return participants;
      });
    // console.log(participantsRoster1);

    const newMatch = new Match({
      type,
      id,
      createdAt,
      duration,
      mapID,
      gameType,
      rankingType,
      serverType,
      roster1,
      roster2,
      participantsRoster1
    });
    newMatch.save((err, savedMatch) => {
      if (err) {
        console.error(err);
        return err;
      }
      console.log(savedMatch);
    });
  })

  // let toSave = {};
  //
  // Object.keys(fakeData).map(property => {
  //   if (property === 'data') {
  //     toSave.type = fakeData[property][0].type;
  //   } else if (property === 'included') {
  //     console.log(toSave.type);
  //   }
  // })



  // const { type } = fakeData.data[0];
  // const { id } = fakeData.data[0];
  // const { createdAt } = fakeData.data[0].attributes;
  // const { duration } = fakeData.data[0].attributes;
  // const { mapID } = fakeData.data[0].attributes.stats;
  // const gameType = fakeData.data[0].attributes.stats.type;
  // const { rankingType } = fakeData.data[0].attributes.tags;
  // const { serverType } = fakeData.data[0].attributes.tags;
  // const { roster1 } = fakeData.data[0].relationships.rosters.data[0];
  // const { roster2 } = fakeData.data[0].relationships.rosters.data[1];


  // const newMatch = new Match({
  //   type,
  //   id,
  //   createdAt,
  //   duration,
  //   mapID,
  //   gameType,
  //   rankingType,
  //   serverType,
  //   roster1,
  //   roster2,
  // });
  // newMatch.save((err, savedMatch) => {
  //   if (err) {
  //     console.error(err);
  //     return err;
  //   }
  //   console.log(savedMatch);
  // });

 //  async function GetAllRankedGames(response){
 //  try {
 //     const allRankedGames = await
 //       fakeData.data.filter(function( obj ) {
 //         return obj.attributes.tags.rankingType == 'RANKED';
 //       });
 //     return allRankedGames;
 //   }
 //   catch(error) {
 //     console.log(error.response)
 //   }
 // }
 //
 // GetAllRankedGames(fakeData).then( function(result) {
 //   res.json(result);
 // });


  res.json(fakeData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);
