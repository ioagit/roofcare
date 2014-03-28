/**
 * Created by isuarez on 3/27/14.
 */
angular.module('app').controller('rcSignUpCtrl', function($scope, rcAuthSvc, rcNotifierSvc, $location) {

  $scope.signup = function() {

      //Create the new UserData object
      var newUserData  =  {
          username: $scope.email,
          password: $scope.password,
          firstName: $scope.fname,
          lastName: $scope.lname
      };

      //Call the rcAuth Service
      rcAuthSvc.createUser(newUserData).then(
          //Success
          function () {
              rcNotifierSvc.notify('User Account Created!');
            $location.path('/');
          },
          //Fail
          function(reason) {
              rcNotifierSvc.error(reason);
          });
   //End Signup Function
   };




});