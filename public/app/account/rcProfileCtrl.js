/**
 * Created by isuarez on 3/29/14.
 */

angular.module('app').controller('rcProfileCtrl', function($scope, rcAuthSvc, rcIdentitySvc, rcNotifierSvc) {

    //Assing the data
    var user = rcIdentitySvc.currentUser;
    $scope.email = user.username;
    $scope.fname = user.firstName;
    $scope.lname = user.lastName;


    //Update
    $scope.update = function() {

        var newUserData  =  {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        if ($scope.password && $scope.password.length > 0) {
            password: $scope.password;

        }

        //Call the rcAuth Service
        rcAuthSvc.updateCurrentUser(newUserData).then(
            //Success
            function () {
                rcNotifierSvc.notify('User Account has been updated!');
            },
            //Fail
            function(reason) {
                rcNotifierSvc.error(reason);
            });


    }

});