/**
 * Created by isuarez on 3/20/14.
 */

(function() {

    angular.module('rc.account').factory('authScv', ['identitySvc', 'userResource', 'commonSvc', 'config' , authScv ]);

    function authSvc(identitySvc, userResource, commonSvc, config, translationSvc){


        return {

            authenticateUser: function (username, password) {

                var deferred = commonSvc.q.defer();
                commonSvc.http.post(config.endpoints.auth.login, {username: username, password: password})

                    .then(function (response) {
                        if (response.data.success) {
                            var user = new userResource();
                            angular.extend(user, response.data.user);
                            identitySvc.currentUser = user;
                            deferred.resolve(true);
                        }
                        else
                            deferred.resolve(false);

                    });
                return deferred.promise;
            },


            createUser: function(newUserData) {

                var user = new userResource(newUserData);
                var deferred = commonSvc.q.defer();

                user.$save().then(function() {
                        identitySvc.currentUser = user;
                        deferred.resolve();

                    },
                    function(response) {
                        deferred.reject(response.data.reason);
                    }
                );

                return deferred.promise;
            },


            updateCurrentUser: function(newUserData) {

                //cloning the current user in order to extend it with newUSerData.
                //Only is save is success identitySvc.currentUser will be updated.
                var clone = angular.copy(identitySvc.currentUser);
                angular.extend(clone, newUserData);

                var deferred = commonSvc.q.defer();

                clone.$update().then(function() {
                        identitySvc.currentUser = clone;
                        deferred.resolve();

                    },
                    function(response) {
                        deferred.reject(response.data.reason);
                    }
                );

                return deferred.promise;
            },

            authorizeCurrentUserForRoute:  function (role) {
                if (identitySvc.isAuthorized(role)) {
                    return true;
                }
                else {
                    return commonSvc.q.reject(commonSvc.translation.notAuthorized);
                }
            },

            authorizeAuthenticatedUserForRoute:  function () {
                if (identitySvc.isAuthenticated()) {
                    return true;
                }
                else {
                    return commonSvc.q.reject(commonSvc.translation.notAuthorized);
                }
            },

            logoutUser: function () {

                var deffered = $q.defer();

                $http.get(config.endpoints.auth.logout, {logout: true}).then(function () {

                        identitySvc.currentUser = undefined;
                        deffered.resolve();

                    }
                );

                return deffered.promise;

            }

        };

    }

})();