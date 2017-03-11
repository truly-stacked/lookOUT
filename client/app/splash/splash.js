angular.module('lookoutApp.splash', [])
.controller('splashCtrl', function($scope, dataFactory) {
  $scope.getEvents = function(){
    dataFactory.getAll().then(function(results){
      console.log(results);
    });
  }
});
