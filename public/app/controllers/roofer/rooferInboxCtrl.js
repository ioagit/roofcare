/**
 * Created by isuarez on 2/3/14.
 */

var config = require('app_config');

module.exports = function inboxCtrl($scope, inboxSvc) {


    //Init var
    $scope.offset = 0;
    $scope.rows = []
    $scope.totalFound = 0;



    $scope.getLatest = function() {



        $scope.data =  inboxSvc.getLatest({limit: config.pagination.limit, offset: $scope.offset });
        $scope.data.then(function(data) {
            $scope.rows =   $scope.rows.concat(data.rows);
            $scope.totalFound = data.totalFound;
        });

    };

    $scope.loadMore = function() {
        $scope.offset += config.pagination.limit;
        $scope.getLatest();
    };

    $scope.moreAvailable = function() {
        return $scope.totalFound > $scope.offset + config.pagination.limit;
    }

    $scope.getLatest();

}
