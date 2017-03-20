angular.module('lookoutApp.splash', [])
.controller('splashCtrl', function($scope, $location, dataFactory, eventFactory, resultsFactory) {

  $scope.getEvents = function(location) {
    dataFactory.getAll(location).then(function(results) {
      resultsFactory.insertLocation(location);
      resultsFactory.insertResults(results);
      $location.path('/results');
    });
  };

  $scope.getFilteredEvents = function(category) {
    let location = $scope.address || "1216 Broadway NY, NY";
    dataFactory.getFiltered(category, location).then(function(results) {
      resultsFactory.insertResults(results);
      $location.path('/results');
    });
  };

  $scope.getLocation = function (){
    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
     } else {
         address.innerHTML = "Woops, sorry we cannot get your location because its not supported.";
     }
  };

  $scope.showPosition = function(position) {
    dataFactory.getAddress(position.coords.latitude, position.coords.longitude).then(function(results) {
      $scope.address = results.data.results[0].formatted_address;
      $scope.getEvents($scope.address);
    })
  };

  $scope.showError = function(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            address.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            address.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            address.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            address.innerHTML = "An unknown error occurred.";
            break;
    }
};

});
