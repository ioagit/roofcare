'use strict';


app.controller('rfNavBarLoginCtrl', function($scope, $http, rcNotifierSvc, rcIdentitySvc, rcAuthSvc) {

   $scope.identity = rcIdentitySvc;
   $scope.signin = function (username, password) {

       rcAuthSvc.authenticateUser(username, password).then(function(success) {

               if (success) {
                   rcNotifierSvc.notify('Success Login');
               }
               else
                   rcNotifierSvc.notify('Error login in.');

       }
       )




   }

} );