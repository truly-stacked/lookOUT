const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const keys = require('../config/keys.js');
const request = require ('request');
const compare = require('compare-lat-lon');
const NodeGeocoder = require('node-geocoder');


const app = express();


//++++ init
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./client'));


// HELPER -- 
// Check for null
let nullChecker = (event, arrayKeys) => {
  let solution = "";
  let position = 0;

  let checkAllValue = (obj, key) => {
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

let options = {
	provider: 'google',
	httpAdapter: 'https',
	formatter: null
};

let geocoder = NodeGeocoder (options);


// ROUTES --
app.get('/results', (req, res) => {

  let locationSearch = (req.query.location);
  let searchLong = -73.9712;
  let searchLat = 40.7831;
  let searchDate = 'today' || req.query.date;
  let searchPrice = 'free';
  let locationWithin = '1mi';
  let eventsObj = [];
  let eventObj = {};


geocoder.geocode(locationSearch)
  .then(function(res) {
  	searchLat = res[0].latitude;
    searchLong = res[0].longitude;
  }).then(function(){
    
  request('https://www.eventbriteapi.com/v3/events/search/?token='+keys.oAuthKey
  	+'&location.latitude='+searchLat
  	+'&location.longitude='+searchLong
  	+'&start_date.keyword='+searchDate
  	+'&price='+searchPrice
  	+'location.within='+locationWithin
  	+'&expand=venue,category', 
  	
  	function (err, body) {
      if(err) {
        console.log('YOU FAILED', err);
   	  }else{
   	    let eventbriteObj = JSON.parse(body.body).events;
   	    let cloneObj = {};
   	   
   	      	    
        // Object Constructor
        eventbriteObj.forEach( (event) => {
          eventObj.id = nullChecker(event,['id']);
   	      eventObj.name = nullChecker(event,['name','text']);
   	      eventObj.time = nullChecker(event,['start','utc']);
   	      eventObj.catName = nullChecker(event,['category','name']);
   	      eventObj.cardImage = nullChecker(event,['logo','url']);
   	      eventObj.ogImage = nullChecker(event,['logo','original','url']);
   	      eventObj.venue = nullChecker(event,['venue','name']);
   	      eventObj.venueAddress = nullChecker(event,['venue','address','localized_address_display']);
   	      eventObj.description = nullChecker(event,['description','text']);
   	      eventObj.lat = nullChecker(event,['venue','latitude']);
   	      eventObj.long = nullChecker(event,['venue','longitude']);
   	      eventObj.distance = compare(searchLat, searchLong, eventObj.lat, eventObj.long).toFixed(2) + ' km';
   	      
   	      cloneObj = JSON.parse(JSON.stringify(eventObj));
   	      eventsObj.push(cloneObj);
   	     
        });
          console.log(eventsObj.length);
          res.json(eventsObj);
      }
    });
  });
});


app.get('/filtered', (req, res) => {

	
  let searchCat = 115 || req.query.cat; // temp placehold for Family & Education
  let searchLong = -73.9712 || req.query.long;
  let searchLat = 40.7831 || req.query.lat;
  let eventsObj = [];
  let eventObj = {};

  request('https://www.eventbriteapi.com/v3/events/search/?token='+keys.oAuthKey
  	+'&location.latitude='+searchLat
  	+'&location.longitude='+searchLong
  	+'&start_date.keyword='+searchDate
  	+'&price='+searchPrice
  	+'&categories='+searchCat
  	+'&expand=venue,category', 
  	
  	function (err, body) {
      if(err) {
        console.log('YOU FAILED', err);
   	  }else{
   	    let eventbriteObj = JSON.parse(body.body).events;
   	      	   
        // Object Constructor
        eventbriteObj.forEach( (event) => {
          eventObj.id = nullChecker(event,['id']);
   	      eventObj.name = nullChecker(event,['name','text']);
   	      eventObj.time = nullChecker(event,['start','utc']);
   	      eventObj.catName = nullChecker(event,['category','name']);
   	      eventObj.cardImage = nullChecker(event,['logo','url']);
   	      eventObj.ogImage = nullChecker(event,['logo','original','url']);
   	      eventObj.venue = nullChecker(event,['venue','name']);
   	      eventObj.venueAddress = nullChecker(event,['venue','address','localized_address_display']);
   	      eventObj.description = nullChecker(event,['description','text']);
   	      eventObj.lat = nullChecker(event,['venue','latitude']);
   	      eventObj.long = nullChecker(event,['venue','longitude']);
   	      eventObj.distance = compare(searchLat, searchLong, eventObj.lat, eventObj.long).toFixed(2) + ' km';

   	      cloneObj = JSON.parse(JSON.stringify(eventObj));
   	      eventsObj.push(cloneObj);
        });
          //console.log(eventsObj);
          res.json(eventsObj);
      }
    });
});

app.get('/event', (req, res) => {

geocoder.geocode('29 champs elysée paris', function(err, res) {
  console.log(res);
});


  let searchLong = -73.9712 || req.query.long;
  let searchLat = 40.7831 || req.query.lat;
  let searchID = 32807965508 || req.query.id; // temp placeholder
  let eventObj = {};

  request('https://www.eventbriteapi.com/v3/events/'+searchID
  	+'/?token='+keys.oAuthKey
  	+'&expand=venue,category',
  	
  	function (err,body) {
  	  if (err) {
  	  	console.log('You Fail', err);
  	  } else {
        let event = JSON.parse(body.body);
 
        eventObj.id = nullChecker(event,['id']);
   	    eventObj.name = nullChecker(event,['name','text']);
   	    eventObj.time = nullChecker(event,['start','utc']);
   	    eventObj.catName = nullChecker(event,['category','name']);
   	    eventObj.cardImage = nullChecker(event,['logo','url']);
   	    eventObj.ogImage = nullChecker(event,['logo','original','url']);
   	    eventObj.venue = nullChecker(event,['venue','name']);
   	    eventObj.venueAddress = nullChecker(event,['venue','address','localized_address_display']);
   	    eventObj.description = nullChecker(event,['description','text']);
   	    eventObj.lat = nullChecker(event,['venue','latitude']);
   	    eventObj.long = nullChecker(event,['venue','longitude']);
   	    eventObj.distance = compare(searchLat, searchLong, eventObj.lat, eventObj.long).toFixed(2) + ' km';
 		
 		res.json(eventObj);
  	  }
  	});
});


app.listen(process.env.port||8888);
