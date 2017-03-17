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
    let location = "1216 Broadway NY, NY";
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
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(typeof 'http://maps.googleapis.com/maps/api/geocode/json?latlng=37.76893497,-122.42284884&sensor=false');
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

