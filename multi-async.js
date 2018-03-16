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


async function getMatchType(match){
  try {
    const getMatchType = match.type;
    return getMatchType;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getMatchRoster1(match){
  try {
    const getMatchRoster1 = match.relationships.rosters.data[0].id;
    return getMatchRoster1;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getParticipantsRoster1(roster1, fakeData){
  try {
    const getParticipantsRoster1 = fakeData.included.filter(function( obj ) {
        return obj.type == 'roster' && obj.id == roster1;
    });
    console.log(getParticipantsRoster1[0].relationships.participants.data);
    return getParticipantsRoster1[0].relationships.participants.data
  }
  catch(error) {
    console.log(error.response)
  }
}

// Test on fake data

app.get('/test-fake-data', (req, res) => {

  fakeData.data.map(match => {

    async function main(){
      try {
        const type = getMatchType(match);
        const roster1 = getMatchRoster1(match);
        const participantsRoster1 = getParticipantsRoster1(await roster1, fakeData);

        const datasMatch =
          {
            type: await type,
            roster1Id: await roster1,
            participantsRoster1: await participantsRoster1,
          };


        const newMatch = new Match(
          datasMatch
        );

        newMatch.save((err, savedMatch) => {
          if (err) {
            console.error(err);
            return err;
          }
          console.log(savedMatch);
        });


      }
      catch(error) {
        console.log(error.response)
      }
    }

    main();
    // const toto = main();
    // console.log(toto);
    //
    //
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
    //   participantsRoster1
    // });
    // newMatch.save((err, savedMatch) => {
    //   if (err) {
    //     console.error(err);
    //     return err;
    //   }
    //   console.log(savedMatch);
    // });



  })


  res.json(fakeData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);
