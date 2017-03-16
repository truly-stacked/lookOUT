angular.module('lookoutApp',[
  'lookoutApp.event',
  'lookoutApp.results',
  'lookoutApp.splash',
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
      .otherwise({
        templateUrl: 'app/splash/splash.html',
        controller: 'splashCtrl'
      })
  })
  .factory('dataFactory', function($http) {
    const getAll = function(location) {
      console.log(location)
      return $http({
        method: 'GET',
        url: '/results',
        params: {location: location}
      })
      .then(
      function(results){
        //Successful get request function and message
        console.log("Got all events!");
        return results
      })
      .catch(
        function(err){
          console.log("ERROR!")
        });
    }

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
          return results
        })
        .catch(
          function(err){
            throw new Error(err)
          });
      }

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
            return result
          })
        .catch(
          function(err){
            throw new Error(err)
          });
      }

      return {
        getAll : getAll,
        getFiltered : getFiltered,
        getEvent : getEvent
    }
  })
  .factory('eventFactory', function($http) {
    var current = {}
    current.insertEvent = function(value) {
      current.event = value;
    }

    return current;
  })
  .factory('resultsFactory', function($http) {
    var current = {}
    current.insertLocation = function(location) {
      current.location = location;
    }
    current.insertResults = function(results) {
      current.results = results;
    }

    return current
  })
