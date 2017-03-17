const NodeGeocoder = require('node-geocoder'),
  request = require ('request'),
  express = require('express'),
  passport = require('passport'),
  satelize = require('satelize'),
  compare = require('compare-lat-lon'),
  utils = require('./utils.js'),
  options = {provider: 'google', httpAdapter: 'https', formatter: null},
  geocoder = NodeGeocoder (options);

  oAuthKey = process.env.oAuthKey;



  var apiroutes = express.Router();

  apiroutes.post('/signup', function(req,res){
    console.log("Im in this.")
    if(!req.body.name || !req.body.password){
      res.json({success: false, msg: 'Please give and name and password'});
    }else{
      var newUser = new User({
        name: req.body.name,
        password: req.body.password
      });

      newUser.save(function(err){
        if (err){
          return res.json({success: false, msg: 'User already exists'});
        }
          res.json({success: true, msg: 'Successful created user.'});
      });
    }
  });

  apiroutes.post('/authenticate', function(req,res){
    User.findOne({
      name: req.body.name
    }, function(err,user){
      if (err) throw err;

      if(!user){
        res.send({success: false, msg: 'This user wasnt found'});
      } else{
        user.comparePassword(req.body.password, function(err, match){
          if(match && !err){
            var token = jwt.encode(user, process.env.secret);
            res.json({success: true, token: 'JWT' + token});
          }else{
            res.send({success:false, msg: 'Wrong Password'});
          }
        });
      }
    });
  });

  apiroutes.get('/memberinfo', passport.authenticate('jwt', {session:false}), function(req,res){
    var token = getToken(req.headers);
    if(token){
      var decoded = jwt.decode(token, config.secret);
      User.findOne({
        name:decoded.name
      }, function(err,user){
        if (err) throw err;

        if(!user){
          return res.status(403).send({success:false, msg: 'User not found.'});
        } else{
          res.json({success: true, msg: 'Welcome!'});
        }
      });
    }else{
      return res.status(403).send({success:false, msg: 'No token!'});
    }
  });


  getToken = function(headers){
    if(headers && headers.authorization){
      var parted = headers.authorization.split(' ');
      if(parted.length === 2){
        return parted[1]
      }else{
        return null;
      }
    }else{
      return null;
    }
  };





module.exports = function (app, express) {


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
    }).then(function(){ request('https://www.eventbriteapi.com/v3/events/search/?token='+ oAuthKey
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

  //let ip = '172.56.36.2' || req.header('x-forwarded-for') || req.connection.remoteAddress; // Only works on mobile
  let searchCat = req.query.category,
    searchLong = -73.9712 || req.query.long,
    searchLat = 40.7831 || req.query.lat,
    searchDate = 'today' || req.query.date,
    searchPrice = 'free',
    eventsObj = [],
    eventObj = {},
    locationSearch = req.query.address;

  geocoder.geocode(locationSearch)
    .then(function(res) {
      searchLat = res[0].latitude;
      searchLong = res[0].longitude;
    }).then(function(){ request('https://www.eventbriteapi.com/v3/events/search/?token='+oAuthKey
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

// AUTH





};
