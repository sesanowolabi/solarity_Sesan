const express = require('express');
const path = require('path');

const fetch = require('node-fetch');
const fs = require('fs');

const app = express();
var cors = require('cors');
const port = process.env.PORT || 5000;

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var mongodb = require('mongodb');

// required for cron job
var cron = require('node-cron');
var axios = require('axios');



ObjectID = require('mongodb').ObjectID;

mongoose.connect("mongodb://heroku_ncnzs94m:5p461rp07ah6u5v1o1nl8kjfm1@ds151994.mlab.com:51994/heroku_ncnzs94m");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.use(cors());

app.use(session({
  secret: 'OOoooOOOoooooo',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
      mongooseConnection: db
  })
}));

//const expressip = require('express-ip');

const sampleip = {"range":[1136197632,1136198655],"country":"US","region":"NA","eu":"0","timezone":"America/Los_Angeles","city":"Spokane","ll":[47.697,-117.198],"metro":881,"area":20};

//app.use(expressip().getIpInfoMiddleware);

//app.set("PORT", port);

//prerender setup
const prerender = require('prerender-node').set('prerenderToken', 'wMgUTIDV9W2Zkow1b2Tu');
prerender.crawlerUserAgents.push('googlebot');
prerender.crawlerUserAgents.push('bingbot');
prerender.crawlerUserAgents.push('yandex');
prerender.crawlerUserAgents.push('facebot');
app.use(prerender);

app.get('/testip', (req, res) => {
  res.send(sampleip);
});


const API_HOST = 'https://content-staging.solaritycu.org';

fetch(`${API_HOST}/graph-api`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `bearer FRgdwQcAe6y1PuaMs3rGf7zm4p3GKeXWFTKsXu3bMQgni_cUFl45PbhzRcsNbt3m` },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    );
    result.data.__schema.types = filteredData;
    fs.writeFile('./client/src/fragmentTypes.json', JSON.stringify(result.data), err => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });


// API calls
// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

app.get('/api/*', function(req, res, next){
    req.database = db;
    next();
});

var routes = require('./routes');
app.use('/api', routes);




  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build'), {maxAge: "1d"}));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
  	
  	res.setHeader("Cache-Control", "public, max-age=86400000");
  	res.setHeader("Expires", new Date(Date.now() + 86400000).toUTCString());
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });



cron.schedule('*/60 * * * *', () => {
  axios.get('http://localhost:5000/api/rates-calculator/update-bellingham-purchase')
  .then(function (response) { console.log('success Bham Purchase')})
  .catch(function (error) {
    console.log(error);
  });
});
cron.schedule('*/60 * * * *', () => {
  axios.get('http://localhost:5000/api/rates-calculator/update-bellingham-refinance')
  .then(function (response) { console.log('success Bham Refi')})
  .catch(function (error) {
    console.log(error);
  });
});
cron.schedule('*/60 * * * *', () => {
  axios.get('http://localhost:5000/api/rates-calculator/update-olympia-purchase')
  .then(function (response) { console.log('success Oly Purchase')})
  .catch(function (error) {
    console.log(error);
  });
});
cron.schedule('*/60 * * * *', () => {
  axios.get('http://localhost:5000/api/rates-calculator/update-olympia-refinance')
  .then(function (response) { console.log('success Oly Refi')})
  .catch(function (error) {
    console.log(error);
  });
});
cron.schedule('*/60 * * * *', () => {
  axios.get('http://localhost:5000/api/rates-calculator/update-tricities-purchase')
  .then(function (response) { console.log('success Tri Purchase')})
  .catch(function (error) {
    console.log(error);
  });
});
cron.schedule('*/60 * * * *', () => {
  axios.get('http://localhost:5000/api/rates-calculator/update-tricities-refinance')
  .then(function (response) { console.log('success Tri Refi')})
  .catch(function (error) {
    console.log(error);
  });
});
cron.schedule('*/60 * * * *', () => {
  axios.get('http://localhost:5000/api/rates-calculator/update-vancouver-purchase')
  .then(function (response) { console.log('success Van Purchase')})
  .catch(function (error) {
    console.log(error);
  });
});
cron.schedule('*/60 * * * *', () => {
  axios.get('http://localhost:5000/api/rates-calculator/update-vancouver-refinance')
  .then(function (response) { console.log('success Van Refi')})
  .catch(function (error) {
    console.log(error);
  });
});
cron.schedule('*/60 * * * *', () => {
  axios.get('http://localhost:5000/api/rates-calculator/update-yakima-purchase')
  .then(function (response) { console.log('success Yakima Purchase')})
  .catch(function (error) {
    console.log(error);
  });
});
cron.schedule('*/60 * * * *', () => {
  axios.get('http://localhost:5000/api/rates-calculator/update-yakima-refinance')
  .then(function (response) { console.log('success Yakima Refi')})
  .catch(function (error) {
    console.log(error);
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));















