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
             rcIdentitySvc.currentUser = newUser;
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