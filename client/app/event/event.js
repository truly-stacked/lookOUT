angular.module('lookoutApp.event', [])
.controller('eventCtrl', function($scope, $window, $sce, eventFactory, dataFactory) {
  $scope.event = eventFactory.event;
  $scope.escapedAddress = $scope.event.venueAddress.split(" ").join("%20");
  $scope.untrustedMapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDanwxT0CdlMhsj0D2Yn-t6gNZ6K3_Pjfs&q="+$scope.escapedAddress;
  $scope.mapUrl = $sce.trustAsResourceUrl($scope.untrustedMapUrl)
});
