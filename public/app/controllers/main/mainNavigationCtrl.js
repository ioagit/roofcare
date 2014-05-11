/**
 * Created by isuarez on 2/3/14.
 */

var config = require('app_config');

module.exports = function mainOrderStartCtrl($scope, $location) {

    $scope.isLinkActive = function(linkTitle) {

        return linkTitle === $scope.sessionName;

    };

    $scope.navigate = function(url, sessionName) {

       $scope.sessionName = sessionName;
       $location.path('/' + url)

    }


};
