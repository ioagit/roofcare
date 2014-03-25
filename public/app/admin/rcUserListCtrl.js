/**
 * Created by isuarez on 3/25/14.
 */

angular.module('app').controller('rcUserListCtrl', function ($scope, rcUser) {

    $scope.users = rcUser.query();

});

