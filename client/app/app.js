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
  })
  .factory('dataFactory', function($http) {
    const getAll = function() {
      console.log("Got all events!");
    }

    const getFiltered = function(catagory) {
      console.log("Got filtered events!");
    }

    const getEvent = function(eventID) {
      console.log("Got a single event!");
    }

    return {
      getAll : getAll,
      getFiltered : getFiltered,
      getEvent : getEvent
    }

  });
