angular.module('lookoutApp.splash', [])
.controller('splashCtrl', function($scope, $location, dataFactory, eventFactory) {

  $scope.mockEvent = {
    id: 1001,
    name: "Mock up event!",
    time: "2017-03-15T01:00:00.000Z", //UTC format
    category: "Music",
    cardImage: "http://bit.ly/2mjYaJl",
    originalImage: "http://bit.ly/2mCRKqM",
    venue: "Hack Reactor",
    Address: "369 Lexington Ave",
    Distance: "0.5 mi"
  }
  $scope.getEvents = function(){
    dataFactory.getAll().then(function(results){
      console.log(results);
    });
  }

  $scope.openEvent = function(event){
    eventFactory.insertEvent(event);
    $location.path('/event');
  }
});
