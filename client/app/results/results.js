angular.module('lookoutApp.results', [])
.controller('resultsCtrl', function($scope, $window, $location, resultsFactory, dataFactory, eventFactory) {
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
    //simply directs to the events fullpage view
    eventFactory.insertEvent(event);
    $location.path('/event');
  }

  $scope.getFilteredEvents = function(category) {
    //responsible for filtering a list of events by category. See EventBright
    //API for category number meanings.
    $scope.location = resultsFactory.location;
    dataFactory.getFiltered(category, $scope.location).then(function(results) {
      $scope.results = results.data;
    })
  }
});
