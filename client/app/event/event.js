angular.module('lookoutApp.event', [])
.controller('eventCtrl', function($scope, eventFactory, dataFactory) {
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
  if(eventFactory.event) {
    $scope.event = eventFactory.event
  }

});
