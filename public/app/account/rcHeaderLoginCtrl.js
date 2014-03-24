'use strict';


app.controller('rcHeaderLoginCtrl', function($scope, $http, rcNotifierSvc, rcIdentitySvc, rcAuthSvc, $location) {

   $scope.identity = rcIdentitySvc;
   $scope.signin = function (username, password) {

       rcAuthSvc.authenticateUser(username, password).then(function(success) {

               if (success) {
                   rcNotifierSvc.notify('Success Login');
               }
               else
                   rcNotifierSvc.notify('Error login in.');

       }
       );


   $scope.signout = function() {

       rcAuthSvc.logoutUser().then(function() {
           $scope.username = "";
           $scope.password = "";
           rcNotifierSvc.notify('You have been successfylly signe out');
           $location.path("/");
       })
   }

   }

} );