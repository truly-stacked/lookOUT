const NodeGeocoder = require('node-geocoder'),
  request = require ('request'),
  satelize = require('satelize'),
  keys = require('../config/keys.js'),
  compare = require('compare-lat-lon'),
  utils = require('./utils.js'),
  options = {provider: 'google', httpAdapter: 'https', formatter: null},
  geocoder = NodeGeocoder (options);



module.exports = function (app, express) {

//Return an object that contains all events.

app.get('/results', (req, res) => {

let locationSearch = (req.query.location),
  searchLong = -73.9712,
  searchLat = 40.7831,
  searchDate = 'today',
  searchPrice = 'free',
  locationWithin = '1mi',
  eventsObj = [],
  eventObj = {},
  cleanedData = [];
  

  geocoder.geocode(locationSearch)
    .then(function(res) {
  	  searchLat = res[0].latitude;
      searchLong = res[0].longitude;
    }).then(function(){ request('https://www.eventbriteapi.com/v3/events/search/?token='+keys.oAuthKey
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
   	    let eventbriteObj = JSON.parse(body.body).events,
   	      cloneObj = {};

        // Object Constructor
        eventbriteObj.forEach( (event) => {
          eventObj.id = utils.nullChecker(event,['id']);
   	      eventObj.name = utils.nullChecker(event,['name','text']);
   	      eventObj.time = utils.nullChecker(event,['start','utc']);
   	      eventObj.catName = utils.nullChecker(event,['category','name']);
   	      eventObj.cardImage = utils.nullChecker(event,['logo','url']);
   	      eventObj.ogImage = utils.nullChecker(event,['logo','original','url']);
   	      eventObj.venue = utils.nullChecker(event,['venue','name']);
   	      eventObj.venueAddress = utils.nullChecker(event,['venue','address','localized_address_display']);
   	      eventObj.description = utils.nullChecker(event,['description','text']);
   	      eventObj.lat = utils.nullChecker(event,['venue','latitude']);
   	      eventObj.long = utils.nullChecker(event,['venue','longitude']);
   	      eventObj.distance = (0.621371*(compare(searchLat, searchLong, eventObj.lat, eventObj.long))).toFixed(2) + ' mi';
   	      eventObj.shortName = (eventObj.name.length < 80) ? utils.nullChecker(event,['name','text']).slice(0,80) : utils.nullChecker(event,['name','text']).slice(0,80)+"..";

   	      //cleans object
   	      let isTBD = Object.keys(eventObj).map((key) => {
           return eventObj[key];
         }).indexOf('TBD') > 1;

        if(!isTBD) {
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


  //let ip = '172.56.36.2' || req.header('x-forwarded-for') || req.connection.remoteAddress; // Only works on mobile
  let searchCat = req.query.category,
    searchLong = -73.9712 || req.query.long,
    searchLat = 40.7831 || req.query.lat,
    searchDate = 'today' || req.query.date,
    searchPrice = 'free',
    eventsObj = [],
    eventObj = {},
    locationSearch = req.query.address;


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
    }).then(function(){ request('https://www.eventbriteapi.com/v3/events/search/?token='+keys.oAuthKey
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
     	      eventObj.id = utils.nullChecker(event,['id']);
   	          eventObj.name = utils.nullChecker(event,['name','text']);
   	          eventObj.time = utils.nullChecker(event,['start','utc']);
   	          eventObj.catName = utils.nullChecker(event,['category','name']);
   	          eventObj.cardImage = utils.nullChecker(event,['logo','url']);
   	          eventObj.ogImage = utils.nullChecker(event,['logo','original','url']);
   	          eventObj.venue = utils.nullChecker(event,['venue','name']);
   	          eventObj.venueAddress = utils.nullChecker(event,['venue','address','localized_address_display']);
   	          eventObj.description = utils.nullChecker(event,['description','text']);
   	          eventObj.lat = utils.nullChecker(event,['venue','latitude']);
   	          eventObj.long = utils.nullChecker(event,['venue','longitude']);
   	          eventObj.distance = (0.621371*(compare(searchLat, searchLong, eventObj.lat, eventObj.long))).toFixed(2) + ' mi';
   	          eventObj.shortName = (eventObj.name.length < 80) ? utils.nullChecker(event,['name','text']).slice(0,80) : utils.nullChecker(event,['name','text']).slice(0,80)+"..";

  			 let isTBD = Object.keys(eventObj).map((key) => {
           return eventObj[key];
         }).indexOf('TBD') > 1;

        if(!isTBD) {
           cloneObj = JSON.parse(JSON.stringify(eventObj));
           eventsObj.push(cloneObj);
         }
        });
          res.json(eventsObj);
      }
    });
  });
  });

};
