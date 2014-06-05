/**
 * Created by isuarez on 4/10/2014.
 */

'use strict';

(function() {

    'use strict';
    var controllerId = 'HeaderLoginCtrl';
    angular.module('rc.account').controller(controllerId, ['$location', 'config', 'identitySvc','authSvc', 'commonSvc', 'translation',
        HeaderLoginCtrl]);

    function HeaderLoginCtrl($location, config, identitySvc, authSvc, commonSvc, translation) {

        var vm = this;

        //var translation =  commonSvc.translation;

        vm.identity = identitySvc;
        vm.signin = function (username, password) {

            authSvc.authenticateUser(username, password)
                .then(function (success) {

                    if (success) {
                        commonSvc.logger.logSuccess(translation.loginSuccess, null, null, true);
                        $location.path('/contractor/dashboard');
                        return;
                    }
                    else
                    {
                        commonSvc.logger.logError(translation.loginError,
                                                  translation.loginInvalid,
                                                  translation.authentication, true);
                    }

                }
            );
        };


        vm.signout = function() {


                authSvc.logoutUser().then(function() {
                    vm.username = "";
                    vm.password = "";
                    commonSvc.logger.logSucces(translation.logoutSuccess, null, null, true);
                    $location.path(config.path.contractorHome);
                })
            }


    }


})();
