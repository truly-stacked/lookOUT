angular.module('lookoutApp',[
  'lookoutApp.event',
  'lookoutApp.results',
  'lookoutApp.splash',
  'lookoutApp.auth',
  'ngRoute'
])
  .config( function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'app/splash/splash.html',
        controller: 'splashCtrl'
      })
      .when('/splash', {
        templateUrl: 'app/splash/splash.html',
        controller: 'splashCtrl'
      })
      .when('/event', {
        templateUrl: 'app/event/event.html',
        controller: 'eventCtrl'
      })
      .when('/results', {
        templateUrl: 'app/results/results.html',
        controller: 'resultsCtrl'
      })
      .when('/register', {
        templateUrl:'app/auth/register.html',
        controller: 'authCtrl'
      })
      .when('/login', {
        templateUrl:'app/auth/login.html',
        controller: 'authCtrl'
      })
      .when('/dashboard', {
        templateUrl:'app/auth/dashboard.html',
        controller: 'authCtrl'
      })
      .otherwise({
        templateUrl: 'app/splash/splash.html',
        controller: 'splashCtrl'
      });
  })
  .factory('dataFactory', function($http) {
    
    const getAll = function(location) {
      console.log(location);
      return $http({
        method: 'GET',
        url: '/results',
        params: {location: location}
      })
      .then(
      function(results){
        //Successful get request function and message
        console.log("Got all events!");
        return results;
      })
      .catch(
        function(err){
          console.log("ERROR!");
        });
    };

    const getFiltered = function(category, location) {
      return $http({
        method: 'GET',
        url: '/filtered',
        params: {category:category, address:location}
      })
      .then(
        function(results){
          //Successful get request function and message
          console.log("Got filtered events!");
          return results;
        })
        .catch(
          function(err){
            throw new Error(err);
          });
      };

      const getEvent = function(eventID) {
        return $http({
          method: 'GET',
          url: '/event',
          params: {eventID:eventID}
        })
        .then(
          function(result){
            //Successful get request function and message
            console.log("Got a single event!");
            return result;
          })
        .catch(
          function(err){
            throw new Error(err);
          });
      };

      const getAddress = function(lat, long) {
        return $http({
          method: 'GET',
          url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=false'
        })
        .then(
          function(results){
            return results;
          })
          .catch(
            function(err) {
              console.log('There was an error');
              console.error(err);
            });
      };

      return {
        getAll : getAll,
        getFiltered : getFiltered,
        getEvent : getEvent,
        getAddress : getAddress
    };
  })
  .factory('eventFactory', function($http) {
    var current = {};
    current.insertEvent = function(value) {
      current.event = value;
    };

    return current;
  })
  .factory('resultsFactory', function($http) {
    var current = {};
    current.insertLocation = function(location) {
      current.location = location;
    };
    current.insertResults = function(results) {
      current.results = results;
    };

    return current;
  })

  .factory('userFactory', function ($http){
    // let user = {};


    const register = function (username, password){
     
     // user.username = username;
     // user.password = password;

      return $http({
        method: 'POST',
        url: '/register',
        data: {username: username, password: password}
      })
      .then (
      function (users){
        console.log('user saved');
        return users;
      })
      .catch(
        function(err){
          console.log("ERROR!");
        });
   
    }; 

     return {register: register};
  });



