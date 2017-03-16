angular.module('lookoutApp.results', [])
.controller('resultsCtrl', function($scope, $location, resultsFactory, dataFactory, eventFactory) {
  $scope.getEvents = function(location){
    $scope.location = location;
    dataFactory.getAll(location).then(function(results){
      $scope.results = results.data;
    });
  }

  if(resultsFactory.results.data) {
    $scope.results = resultsFactory.results.data;
  }

  $scope.openEvent = function(event){
    eventFactory.insertEvent(event);
    $location.path('/event');
  }

  $scope.getFilteredEvents = function(category) {
    dataFactory.getFiltered(category, $scope.location).then(function(results) {
      resultsFactory.insertResults(results);
      $location.path('/results');
    })
  }
});
