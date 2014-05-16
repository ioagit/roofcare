/**
 * Created by isuarez on 3/27/14.
 */
module.exports =  function signupCtrl($scope, authSvc, notifierSvc, $location) {

    $scope.signup = function() {

        //Create the new UserData object
        var newUserData  =  {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        //Call the rcAuth Service
        authSvc.createUser(newUserData).then(
            //Success
            function () {
                notifierSvc.notify('User Account Created!');
                $location.path('/');
            },
            //Fail
            function(reason) {
                notifierSvc.error(reason);
            });;

        //End Signup Function
    };






}