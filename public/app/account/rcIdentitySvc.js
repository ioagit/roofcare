angular.module('app').factory('rcIdentitySvc', function($window, rcUser) {

    var currentUser;

    if (!!$window.currentUser ) {

        currentUser = new rcUser();
        angular.extend(currentUser,$window.currentUser);
    }

    return {

        currentUser: currentUser,

        isAuthenticated: function() {
            return !!this.currentUser;
        },

        isAuthorized: function(role) {
            return this.isAuthenticated() && this.currentUser.hasRole(role);
        }


    }
});