angular.module('lookoutApp.results', [])
.controller('resultsCtrl', function($scope, $location, resultsFactory, dataFactory, eventFactory) {
  console.log(resultsFactory.results.data)
  $scope.results = resultsFactory.results.data;
  $scope.openEvent = function(event){
    eventFactory.insertEvent(event);
    $location.path('/event');
  }
});
