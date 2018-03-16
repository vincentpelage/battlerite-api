// Package import
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');

const fakeData = require('./fakeData');
const Match = require('./matchModel');
var fns = require("./utils/functions");

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
    return match.type;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getMatchId(match){
  try {
    return match.id;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getMatchCreatedAt(match){
  try {
    return match.attributes.createdAt;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getMatchDuration(match){
  try {
    return match.attributes.duration;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getMapId(match){
  try {
    return match.attributes.stats.mapID;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getGameTypeId(match){
  try {
    return match.attributes.stats.type;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getRankingTypeId(match){
  try {
    return match.attributes.tags.rankingType;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getServerTypeId(match){
  try {
    return match.attributes.tags.serverType;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getRoster1Id(match){
  try {
    return match.relationships.rosters.data[0].id;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getRoster2Id(match){
  try {
    return match.relationships.rosters.data[1].id;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getParticipantsRoster1Ids(roster1, fakeData){
  try {
    const getParticipantsRoster1Ids = fakeData.included.filter(function( obj ) {
        return obj.type == 'roster' && obj.id == roster1;
    });
    return getParticipantsRoster1Ids[0].relationships.participants.data
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getParticipantsRoster2Ids(roster2, fakeData){
  try {
    const getParticipantsRoster2Ids = fakeData.included.filter(function( obj ) {
        return obj.type == 'roster' && obj.id == roster2;
    });
    return getParticipantsRoster2Ids[0].relationships.participants.data
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getParticipant1Roster1Champion(roster1, participantsRoster1){
  try {
    const getParticipant1Roster1Champion = fakeData.included.filter(function( obj ) {
        return obj.type == 'participant' && obj.id == participantsRoster1[0].id;
    });
    const champion = {};
    champion.championId = getParticipant1Roster1Champion[0].attributes.actor;
    champion.stats = getParticipant1Roster1Champion[0].attributes.stats;
    return champion;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getParticipant2Roster1Champion(roster1, participantsRoster1){
  try {
    const getParticipant2Roster1Champion = fakeData.included.filter(function( obj ) {
        return obj.type == 'participant' && obj.id == participantsRoster1[1].id;
    });
    const champion = {};
    champion.championId = getParticipant2Roster1Champion[0].attributes.actor;
    champion.stats = getParticipant2Roster1Champion[0].attributes.stats;
    return champion;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getParticipant3Roster1Champion(roster1, participantsRoster1){
  try {
    const getParticipant3Roster1Champion = fakeData.included.filter(function( obj ) {
        return obj.type == 'participant' && obj.id == participantsRoster1[2].id;
    });
    const champion = {};
    champion.championId = getParticipant3Roster1Champion[0].attributes.actor;
    champion.stats = getParticipant3Roster1Champion[0].attributes.stats;
    return champion;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getParticipant1Roster2Champion(roster2, participantsRoster2){
  try {
    const getParticipant1Roster2Champion = fakeData.included.filter(function( obj ) {
        return obj.type == 'participant' && obj.id == participantsRoster2[0].id;
    });
    const champion = {};
    champion.championId = getParticipant1Roster2Champion[0].attributes.actor;
    champion.stats = getParticipant1Roster2Champion[0].attributes.stats;
    return champion;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getParticipant2Roster2Champion(roster2, participantsRoster2){
  try {
    const getParticipant2Roster2Champion = fakeData.included.filter(function( obj ) {
        return obj.type == 'participant' && obj.id == participantsRoster2[1].id;
    });
    const champion = {};
    champion.championId = getParticipant2Roster2Champion[0].attributes.actor;
    champion.stats = getParticipant2Roster2Champion[0].attributes.stats;
    return champion;
  }
  catch(error) {
    console.log(error.response)
  }
}

async function getParticipant3Roster2Champion(roster2, participantsRoster2){
  try {
    const getParticipant3Roster2Champion = fakeData.included.filter(function( obj ) {
        return obj.type == 'participant' && obj.id == participantsRoster2[2].id;
    });
    const champion = {};
    champion.championId = getParticipant3Roster2Champion[0].attributes.actor;
    champion.stats = getParticipant3Roster2Champion[0].attributes.stats;
    return champion;
  }
  catch(error) {
    console.log(error.response)
  }
}


async function main(match, fakeData){
  try {
    const type = getMatchType(match);
    const id = getMatchId(match);
    const createdAt = getMatchCreatedAt(match);
    const duration = getMatchDuration(match);
    const mapID = getMapId(match);
    const gameType = getGameTypeId(match);
    const rankingType = getRankingTypeId(match);
    const serverType = getServerTypeId(match);
    const roster1 = getRoster1Id(match);
    const roster2 = getRoster2Id(match);
    const participantsRoster1 = getParticipantsRoster1Ids(await roster1, fakeData);
    const participantsRoster2 = getParticipantsRoster2Ids(await roster2, fakeData);
    const participant1Roster1Champion = getParticipant1Roster1Champion(await roster1, await participantsRoster1);
    const participant2Roster1Champion = getParticipant2Roster1Champion(await roster1, await participantsRoster1);
    const participant3Roster1Champion = getParticipant3Roster1Champion(await roster1, await participantsRoster1);
    const participant1Roster2Champion = getParticipant1Roster1Champion(await roster2, await participantsRoster2);
    const participant2Roster2Champion = getParticipant2Roster1Champion(await roster2, await participantsRoster2);
    const participant3Roster2Champion = getParticipant3Roster1Champion(await roster2, await participantsRoster2);
    // const roster1Stats(tout le contenu de la propriété stats);
    // const roster2Stats;


    const datasMatch =
      {
        type: await type,
        id: await id,
        createdAt: await createdAt,
        duration: await duration,
        mapID: await mapID,
        gameType: await gameType,
        rankingType: await rankingType,
        serverType: await serverType,
        roster1Id: await roster1,
        roster2Id: await roster2,
        participantsRoster1: await participantsRoster1,
        participantsRoster2: await participantsRoster2,
        participant1Roster1Champion: await participant1Roster1Champion,
        participant2Roster1Champion: await participant2Roster1Champion,
        participant3Roster1Champion: await participant3Roster1Champion,
        participant1Roster2Champion: await participant1Roster2Champion,
        participant2Roster2Champion: await participant2Roster2Champion,
        participant3Roster2Champion: await participant3Roster2Champion,
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

// Test on fake data

app.get('/test-fake-data', (req, res) => {

  fakeData.data.map(match => {

    if(match.attributes.tags.rankingType === "RANKED"){
      main(match, fakeData);
    }

  })

  res.json(fakeData);
  
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);
