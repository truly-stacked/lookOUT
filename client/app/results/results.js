angular.module('lookoutApp.results', [])
.controller('resultsCtrl', function(dataFactory, eventFactory) {
  $scope.openEvent = function(event){
    eventFactory.insertEvent(event);
    $location.path('/event');
  }
});
