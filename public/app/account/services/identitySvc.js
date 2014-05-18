/**
 * Created by isuarez on 4/10/2014.
 */
(function() {

    var serviceId = 'identitySvc';
    angular.module('rc.account').factory(serviceId, ['$window', 'userResource', indentitySvc]);

    function identitySvc($window, userResource) {

        var currentUser;

        if (!!$window.currentUser ) {

            currentUser = new userResource();
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
    }

}
)();
