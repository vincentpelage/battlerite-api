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
//https://stackoverflow.com/questions/45395805/using-await-in-promise-chain
  fakeData.data.map(match => {
  //func
    async function getJSONAsync(){
        let json = await dataToObj(match, fakeData);
        console.log(await json)
        return json;
    }
  //func
    function dataToObj(match, fakeData) {
  //func
      async function GetAllParticipantsRoster1(fakeData){
        try {
          const allParticipants = await
            fakeData.included.filter(function( obj ) {
              const roster1 = match.relationships.rosters.data[0].id;
                return obj.type == 'roster' && obj.id == roster1;
              });
          return allParticipants[0].relationships.participants.data;
        }
        catch(error) {
          console.log(error.response)
        }
      }
      const participantsRoster1 =
        GetAllParticipantsRoster1(fakeData).then( function(participants) {
          // console.log(participants);
          return participants;
        });

      return ({
        type: match.type,
        id: match.id,
        createdAt: match.attributes.createdAt,
        duration: match.attributes.duration,
        mapID: match.attributes.stats.mapID,
        roster1: match.relationships.rosters.data[0].id,
        participantsRoster1: participantsRoster1,
      })
    }

    getJSONAsync().then( function(result) {
      const newMatch = new Match(result);
      newMatch.save((err, savedMatch) => {
        if (err) {
          console.error(err);
          return err;
        }
        console.log(savedMatch);
      });
    });


  })




  res.json(fakeData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);
