angular.module('lookoutApp',[])
  .config(function($routeProvider){
    $routeProvider

      .when('/', {
        templateUrl: 'splash/splash.html',
        controller: 'splashCtrl'
      })

      .when('/splash', {
        templateUrl: 'splash/splash.html',
        controller: 'splashCtrl'
      })

      .when('/events', {
        templateUrl: 'events/event.html',
        controller: 'eventsCtrl'
      })

      .when('/results', {
        templateUrl: 'results/results.html',
        controller: 'resultsCtrl'
      })
  })
  .factory('dataFactory'function($http){
    var getAll = function(){
      console.log("Got all events!")
    }

    var getFiltered = function(catagory){
      console.log("Got filtered events!")
    }

    var getEvent = function(eventID){
      console.log("Got a single event!")
    }

    return {
      getAll : getAll,
      getFiltered : getFiltered,
      getEvent : getEvent
    }

  })
