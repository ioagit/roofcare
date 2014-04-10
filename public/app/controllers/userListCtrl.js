/**
 * Created by isuarez on 3/25/14.
 */

angular.module('App.Controllers').controller('userListCtrl', function ($scope, userResource) {

    $scope.users = userResource.query();

});

