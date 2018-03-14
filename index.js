// Package import
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const fakeData = require('./fakeData');

// Init variable
const app = express();
const key = process.env.KEY_API_BATTLERITE;

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
  let urlListMatchTest = 'https://api.dc01.gamelockerapp.com/shards/global/matches?filter[createdAt-start]=2018-03-03T14:25:30Z&page[limit]=5&page[offset]=5&sort=createdAt';
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

  let toBDD = {
    type: 'match',
    id: '5527B5E74841413A849E4C021D015106',
    createdAt: '2018-03-03T14:25:36Z',
    duration: 603,
    mapID: 'FFFFE4774561141D49B46892B5CBACFA',
    type: 'LEAGUE2V2',
    rankingType: 'RANKED',
    serverType: 'QUICK2V2',
    roster1: 'id',
    roster2: 'id',
  };

  console.log(toBDD)

  async function GetAllRankedGames(response){
  try {
     const allRankedGames = await
       fakeData.data.filter(function( obj ) {
         return obj.attributes.tags.rankingType == 'RANKED';
       });
     return allRankedGames;
   }
   catch(error) {
     console.log(error.response)
   }
 }

 GetAllRankedGames(fakeData).then( function(result) {
   res.json(result);
 });


  // res.json(fakeData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);
