/**
 * Created by isuarez on 6/1/14.
 */


(function() {
    'use strict';

    var controllerId = 'ContractorLoginCtrl';

    angular.module('rc.contractor').controller(controllerId,
        ['commonSvc', 'translation', 'identitySvc', '$location', 'authSvc',ContractorLoginCtrl]);

    function ContractorLoginCtrl(commonSvc, translation, identitySvc, $location, authSvc) {

       //Check is the user is already logged in
       if (identitySvc.currentUser) {
          $location.path('/contractor/dashboard');
         return;
       }

        var vm = this;


        vm.translation = translation;

        vm.formSubmitted = false;



      vm.signin = function () {

        vm.formSubmitted = true;

        if (!isFormValid())
           return;


        authSvc.authenticateUser(vm.username, vm.password)
          .then(function (success) {

            if (success) {
              vm.showInvalidLogin = false;
              $location.path('/contractor/dashboard');
              return;
            }
            else
            {
              vm.showInvalidLogin = true;
              $timeout(function() {vm.showInvalidLogin = false;}, 3000);
            }


          }
        );
      };


      vm.signout = function() {


        authSvc.logoutUser().then(function() {
          vm.username = "";
          vm.password = "";
          $location.path('/login');
        })
      };



        //validation
        vm.isUsernameInvalid = function() {
            return vm.loginForm.username.$invalid && !vm.loginForm.username.$pristine && vm.formSubmitted;
        };

        vm.isPasswordInvalid = function() {
            return vm.loginForm.password.$invalid && !vm.loginForm.password.$pristine && vm.formSubmitted;
        };


        function isFormValid() {
            return vm.loginForm.$valid;
        }




    }
})();
