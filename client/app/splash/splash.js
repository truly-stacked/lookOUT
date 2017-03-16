angular.module('lookoutApp.splash', [])
.controller('splashCtrl', function($scope, $location, dataFactory, eventFactory, resultsFactory) {

  $scope.getEvents = function(location) {
    dataFactory.getAll(location).then(function(results) {
      resultsFactory.insertLocation(location);
      resultsFactory.insertResults(results);
      $location.path('/results');
    });
  }

  $scope.getFilteredEvents = function(category) {
    let location = "1216 Broadway NY, NY"
    dataFactory.getFiltered(category, location).then(function(results) {
      resultsFactory.insertResults(results);
      $location.path('/results');
    })
  }
});
