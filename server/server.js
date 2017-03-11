const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const keys = require('../config/keys.js');
const request = require ('request');

const app = express();


//++++ init
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./client'));

//++++ routes

app.get('/results', function (req, res){
  request('https://www.eventbriteapi.com/v3/events/search/?token='+keys.oAuthKey+'&location.latitude=40.7831&location.longitude=73.9712&expand=venue', function(err, body){
 	err ? console.log(err) : res.json(body)
  });
});





app.get('/filtered', function (req, res){


});

app.get('/event', function (req, res){

});
//console.log(window.oAuthKey);




app.listen(process.env.port||8888);
