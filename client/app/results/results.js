angular.module('lookoutApp.results', [])
.controller('resultsCtrl', function($scope, $location, resultsFactory, dataFactory, eventFactory) {
  $scope.results = resultsFactory.results;
  $scope.openEvent = function(event){
    eventFactory.insertEvent(event);
    $location.path('/event');
  }
});
