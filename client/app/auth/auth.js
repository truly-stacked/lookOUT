angular.module('lookoutApp.auth', [])
.controller('authCtrl', function($scope, $location, userFactory) {


  $scope.getUser = function(username, password) {
   userFactory.register(username, password)
   .then(function (user){
  	console.log('factory', user);
  	//$location.path('/dashboard');
  });

  };
});

