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
        var promise =  authSvc.createUser(newUserData);
        handlePromise(promise, 'User Account Created!');
        //End Signup Function
    };

    //Handles a promise response
    function handlePromise(promise, successMsg) {
        if (!promise) return;
        promise.then(
            //Success
            function () {
                notifierSvc.notify(successMsg);
                $location.path('/');
            },
            //Fail
            function(reason) {
                notifierSvc.error(reason);
            });
    }




}