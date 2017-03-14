angular.module('lookoutApp.event', [])
.controller('eventCtrl', function($scope, $sce, eventFactory, dataFactory) {
  $scope.trustSrc = function(src) {
   return $sce.trustAsResourceUrl(src);
  }
  $scope.mockEvent = {
    id: 1001,
    name: "Minor Threat Reunion",
    time: "2017-03-15T01:00:00.000Z", //UTC format
    category: "MUSIC",
    cardImage: "http://imgur.com/a/YczVQ",
    originalImage: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F19441212%2F166225491007%2F1%2Foriginal.jpg?s=65d0b694bcbf226b6ce707a79565c236",
    venue: "Hack Reactor",
    address: "242 Troutman St Brooklyn, NY",
    distance: "0.5 mi",
    description: "Ian is gonna yell a bunch about being straight edge.  Food and such and music and things and all the good stuff blah blah blah check it out!"
  }
  $scope.escapedAddress = $scope.mockEvent.address.split(" ").join("%20");
  $scope.untrustedMapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDanwxT0CdlMhsj0D2Yn-t6gNZ6K3_Pjfs&q="+$scope.escapedAddress;
  $scope.mapUrl = $sce.trustAsResourceUrl($scope.untrustedMapUrl)
  if(eventFactory.event) {
    $scope.event = eventFactory.event
  }

});
