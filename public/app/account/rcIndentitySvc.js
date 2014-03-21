angular.module('app').factory('rcIdentitySvc', function() {
    return {
        currentUser: undefined,
        isAuthenticated: function() {
            return !!this.currentUser;
        }
    }
});