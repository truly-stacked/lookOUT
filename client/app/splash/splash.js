angular.module('lookoutApp.splash', [])
.controller('splashCtrl', function($scope, $location, dataFactory, eventFactory) {

  $scope.mockEvent = {
    id: 1001,
    name: "Mock up event!",
    time: "2017-03-15T01:00:00.000Z", //UTC format
    category: "Music",
    cardImage: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F16579431%2F145182189853%2F1%2Foriginal.jpg?h=200&w=450&rect=0%2C145%2C1024%2C512&s=d2a8fc3870f947df2804ca40c8443c24",
    originalImage: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F28648276%2F157451750750%2F1%2Foriginal.jpg?s=ad5f005bd80ef4c173b2b1bf57dfd79a",
    venue: "Hack Reactor",
    address: "369 Lexington Ave",
    distance: "0.5 mi"
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
