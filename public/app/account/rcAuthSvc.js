/**
 * Created by isuarez on 3/20/14.
 */

angular.module('app').factory('rcAuthSvc', function ($http, rcIdentitySvc, $q, rcUser) {

    return {

        authenticateUser: function (username, password) {
            var deferred = $q.defer();
            $http.post('/login', {username: username, password: password})
                .then(function (response) {
                    if (response.data.success) {
                        var user = new rcUser();
                        angular.extend(user, response.data.user);
                        rcIdentitySvc.currentUser = user;
                        deferred.resolve(true);
                    }
                    else
                        deferred.resolve(false);

                });
            return deferred.promise;
        },


        createUser: function(newUserData) {

            var user = new rcUser(newUserData);
            var deferred = $q.defer();

            user.$save().then(function() {
             rcIdentitySvc.currentUser = user;
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
            //Only is save is success rcIdentitySvc.currentUser will be updated.
            var clone = angular.copy(rcIdentitySvc.currentUser);
            angular.extend(clone, newUserData);

            var deferred = $q.defer();

            clone.$update().then(function() {
                    rcIdentitySvc.currentUser = clone;
                    deferred.resolve();

                },
                function(response) {
                    deferred.reject(response.data.reason);
                }
            );

            return deferred.promise;
        },

        authorizeCurrentUserForRoute:  function (role) {
            if (rcIdentitySvc.isAuthorized(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },

        authorizeAuthenticatedUserForRoute:  function () {
            if (rcIdentitySvc.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },

        logoutUser: function () {

            var deffered = $q.defer();

            $http.post('/logout', {logout: true}).then(function () {

                    rcIdentitySvc.currentUser = undefined;
                    deffered.resolve();

                }
            );

            return deffered.promise;

        }

    };
});