// Package import
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
require('dotenv').config();


// Local import
const fakeData = require('./fakeData');

// Route import
const home = require('./routes/home') ;
const apiDatas = require('./routes/apiDatas') ;
const bddDatas = require('./routes/bddDatas') ;

// Init variable
const app = express();
const key = process.env.KEY_API_BATTLERITE;



// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', home, apiDatas, bddDatas);




app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);
