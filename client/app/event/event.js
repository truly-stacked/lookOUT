angular.module('lookoutApp.event', [])
.controller('eventCtrl', function($scope, eventFactory, dataFactory) {
  $scope.mockEvent = {
    id: 1001,
    name: "Mock up event!",
    time: "2017-03-15T01:00:00.000Z", //UTC format
    category: "MUSIC",
    cardImage: "http://imgur.com/a/YczVQ",
    originalImage: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F19441212%2F166225491007%2F1%2Foriginal.jpg?s=65d0b694bcbf226b6ce707a79565c236",
    venue: "Hack Reactor",
    address: "369 Lexington Ave",
    distance: "0.5 mi",
    description: "This is an event that is at a place with a bunch of stuff happening. Food and such and music and things and all the good stuff blah blah blah check it out!"
  }
  if(eventFactory.event) {
    $scope.event = eventFactory.event
  }

});
