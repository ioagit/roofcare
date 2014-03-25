/**
 * Created by isuarez on 3/25/14.
 */

angular.module('app').factory('rcUser', function($resource) {

    var UserResource = $resource('/api/users/:id', {_id: "@id"});

    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1
    }

    return UserResource;
});
