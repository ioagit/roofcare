/**
 * Created by isuarez on 4/10/2014.
 */

/**
 * Created by isuarez on 3/25/14.
 */

(function() {

    angular.module('rc.account')
        .factory('userResource', ['$resource', 'config', userResource]);

    function userResource($resource, config) {

        var UserResource = $resource(config.endpoints.user.user +  ':id', {_id: "@id"},
            {
                update: {method: 'PUT', isArray:false}
            }
        );

        UserResource.prototype.isAdmin = function () {
            return this.roles && this.hasRole('admin');
        };

        UserResource.prototype.isContractor = function() {
            return this.roles && this.hasRole('contractor');
        };

        UserResource.prototype.hasRole = function(role) {
            return this.roles.indexOf(role) > -1;
        };

        return UserResource;
    }


})();

