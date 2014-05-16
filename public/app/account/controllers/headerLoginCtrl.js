/**
 * Created by isuarez on 4/10/2014.
 */

'use strict';

(function() {

    'use strict';
    var controllerId = 'HeaderLoginCtrl';
    angular.module('account').controller(controllerId, ['$scope',  'notifierSvc', 'identitySvc', 'authSvc', 'commonSvc', controllerId]);

    function HeaderLoginCtrl($scope,  notifierSvc, identitySvc, authSvc, commonSvc) {

        $scope.identity = identitySvc;
        $scope.signin = function (username, password) {

            authSvc.authenticateUser(username, password).then(function (success) {

                    if (success) {
                        notifierSvc.notify('Success Login');
                    }
                    else
                        notifierSvc.notify('Error login in.');

                }
            );
        }


        $scope.signout = function() {

                authSvc.logoutUser().then(function() {
                    $scope.username = "";
                    $scope.password = "";
                    notifierSvc.notify('You have been successfylly signe out');
                    commonSvc.location.path("/");
                })
            }


    }


})();
