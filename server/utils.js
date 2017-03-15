const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const request = require ('request');
const compare = require('compare-lat-lon');
const NodeGeocoder = require('node-geocoder');
const satelize = require('satelize');
const keys = require('../config/keys.js');




module.exports.createApp = function (){
  
  const app = express();
  
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


//Return an object that contains all events.

app.get('/results', (req, res) => {

  let locationSearch = (req.query.location);
  let searchLong = -73.9712;
  let searchLat = 40.7831;
  let searchDate = 'today' || req.query.date;
  let searchPrice = 'free';
  let locationWithin = '1mi';
  let eventsObj = [];
  let eventObj = {};
  let cleanedData = [];


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
   	      eventObj.distance = (0.621371*(compare(searchLat, searchLong, eventObj.lat, eventObj.long))).toFixed(2) + ' mi';
   	      eventObj.shortD = (eventObj.description.length < 60) ? nullChecker(event,['description','text']).slice(0,60) : nullChecker(event,['description','text']).slice(0,60)+"..";
		  //console.log('New Entry -->', eventObj.description.length, eventObj.shortD);
   	     //console.log(eventObj.shortD);

   	      //cleans object
   	      if(Object.values(eventObj).indexOf('TBD') > -1){
   	      	//console.log('Not included, has TBD');
   	      } else {
   	      	cloneObj = JSON.parse(JSON.stringify(eventObj));
   	      	eventsObj.push(cloneObj);
   	      }  	      
        });
          res.json(eventsObj);
      }
    });
  });
});


app.get('/filtered', (req, res) => {


    // geolocator.config({
    //     language: "en",
    //     google: {
    //         version: "3",
    //         key: "AIzaSyDanwxT0CdlMhsj0D2Yn-t6gNZ6K3_Pjfs"
    //     }
    // });
 
    // window.onload = function () {
    //     var options = {
    //         enableHighAccuracy: true,
    //         timeout: 5000,
    //         maximumWait: 10000,     // max wait time for desired accuracy 
    //         maximumAge: 0,          // disable cache 
    //         desiredAccuracy: 30,    // meters 
    //         fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected 
    //         addressLookup: true,    // requires Google API key if true 
    //         timezone: true,         // requires Google API key if true 
    //         map: "map-canvas",      // interactive map element id (or options object) 
    //         staticMap: true         // map image URL (boolean or options object) 
    //     };
    //     geolocator.locate(options, function (err, location) {
    //         if (err) return console.log(err);
    //         console.log(location);
    //     });
    // };


  let ip = '172.56.36.2' || req.header('x-forwarded-for') || req.connection.remoteAddress; // Only works on mobile
  let searchCat = req.query.category; // temp placehold for Family & Education
  let searchLong = -73.9712 || req.query.long;
  let searchLat = 40.7831 || req.query.lat;
  let searchDate = 'today' || req.query.date;
  let searchPrice = 'free';
  let eventsObj = [];
  let eventObj = {};
  let locationSearch = req.query.address;


//(MVP ++ functionality to interpret address based on IP)
  // satelize.satelize({ip:ip}, function (err, data) {
  //   if (err) {
  //     console.log('Fail');
  //   } else {
	 //  if(data.ip.length > 3) {
  //       searchLat = data.latitude;
	 //    searchLong = data.longitude;
	 //  }
	 //  console.log(data.longitude, data.latitude);
	 //  // console.log('===>', Geolocation.getCurrentPosition());
  //   }
  // });

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
     	      eventObj.distance = (0.621371*(compare(searchLat, searchLong, eventObj.lat, eventObj.long))).toFixed(2) + ' mi';
  			  eventObj.shortD = (eventObj.description.length < 60) ? nullChecker(event,['description','text']).slice(0,60) : nullChecker(event,['description','text']).slice(0,60)+"..";

  			  console.log(eventObj.shortD);
     	      //cleans object
   	          if(Object.values(eventObj).indexOf('TBD') > -1){
   	          	console.log('Not included, has TBD');
   	          } else {
   	          	cloneObj = JSON.parse(JSON.stringify(eventObj));
   	          	eventsObj.push(cloneObj);
   	          }  
          });
          res.json(eventsObj);
      }
    });
  });
});

















  return app;
};