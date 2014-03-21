/**
 * Created by isuarez on 3/20/14.
 */

angular.module('app').factory('rcAuthSvc', function($http, rcIdentitySvc, $q) {
    return {
        authenticateUser: function(username, password) {
            var deferred = $q.defer();
            $http.post('/login', {username: username, password: password})
                .then(function(response){
                    if (response.data.success) {
                        rcIdentitySvc.currentUser = response.data.user;
                        deferred.resolve(true);
  }
                    else
                        deferred.resolve(false);

                })
            return deferred.promise;
        }
    }
})