
const express = require('express'),
  morgan = require ('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  //config = require('../config/keys.js');


module.exports.createApp = function (){

const app = express(),
  database = process.env.mongodbUrl; 
  //|| config.mongoDb;

// initial setup of application
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static('./client'));

// Middlewares


// Connect to mongo DB
mongoose.connect(database, function(err) {
    if (err) {
      console.log('Fail, did not connect');
    } else {
      console.log('I got in MONGO !');
    }
});


// Connect the routes
require('./routes.js')(app, express);
  









return app;
};


module.exports.nullChecker = function (event, arrayKeys){
  let solution = "",
    position = 0,
    checkAllValue = (obj, key) => {
      position +=1;
      if (obj[key] === null){
        return "TBD";
      } else if (obj[key] === undefined){
        return obj;
      }
        return checkAllValue(obj[key], arrayKeys[position]);
    };
  solution = checkAllValue(event, arrayKeys[position]);
  return solution;
};
