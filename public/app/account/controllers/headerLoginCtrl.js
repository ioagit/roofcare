/**
 * Created by isuarez on 4/10/2014.
 */

'use strict';

(function() {

    'use strict';
    var controllerId = 'HeaderLoginCtrl';
    angular.module('rc.account').controller(controllerId, ['$scope', '$location', 'config', 'identitySvc',
                                                        'authSvc', 'commonSvc',
                                                         controllerId]);

    function HeaderLoginCtrl($scope, $location, config, identitySvc, authSvc, commonSvc) {

        var translation = commonSvc.translation;

        translationSvc.getTranslation(translation);


        $scope.identity = identitySvc;
        $scope.signin = function (username, password) {

            authSvc.authenticateUser(username, password)
                .then(function (success) {

                    if (success) {
                        commonSvc.logger.logSucces(translation.successLogin, null, null, true);
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


        $scope.signout = function() {

                authSvc.logoutUser().then(function() {
                    $scope.username = "";
                    $scope.password = "";
                    commonSvc.logger.logSucces(translation.logoutSuccess, null, null, true)
                    $location.path(config.path.contractorHome);
                })
            }


    }


})();
