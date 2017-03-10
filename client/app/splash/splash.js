angular.module('lookoutApp.splash', [])
.controller('splashCtrl', function($scope) {
  $scope.getEvents = function(){
    console.log("Grabbing events!")
  }
});
