'use strict';


app.controller('rfNavBarLoginCtrl', function($scope, $http, rfNotifier, rfIdentitySvc) {

   $scope.identity = rfIdentitySvc;
   $scope.signin = function (username, password) {

       $http.post('/login', {username: username, password: password})
           .then(function(response){
               if (response.data.success) {
                   rfIdentitySvc.currentUser = response.data.user;
                   rfNotifier.notify('Success Login');
               }
               else
                   rfNotifier.notify('Error login in.');
           })

   }

} );