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

// Test on fake data
app.get('/chachou', (req, res) => {
  // recuperer les roster
  const getAllRosters = fakeData.included.filter( objIncluded => {
    return objIncluded.type === 'roster';
  });

  fakeData.data.map( match => {
    const { type, id } = match;
    const { createdAt, duration } = match.attributes;
    const { mapID } = match.attributes.stats;
    const gameType = match.attributes.stats.type;
    const { rankingType, serverType } = match.attributes.tags;
    const roster1 = match.relationships.rosters.data[0].id;
    const roster2 = match.relationships.rosters.data[1].id;
  })

  res.json(fakeData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);
