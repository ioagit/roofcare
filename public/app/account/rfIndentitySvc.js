angular.module('app').factory('rfIdentitySvc', function() {
    return {
        currentUser: undefined,
        isAuthenticated: function() {
            return !!this.currentUser;
        }
    }
});