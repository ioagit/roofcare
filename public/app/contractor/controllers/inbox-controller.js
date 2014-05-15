/**
 * Created by isuarez on 2/3/14.
 */

(function () {

    'use strict';
    var controllerId = 'contractorInboxCtrl'
    angular.module('contractor').controller(controllerId, ['$scope', 'config', 'contractorInboxSvc',controllerId]);

    function contractorInboxCtrl($scope, config, contractorInboxSvc) {

        //Init var
        $scope.offset = 0;
        $scope.rows = []
        $scope.totalFound = 0;

        var limit = config.pagination.limit



        $scope.getLatest = function() {



            $scope.data =  contractorInboxSvc.getLatest({limit: limit, offset: $scope.offset });
            $scope.data.then(function(data) {
                $scope.rows =   $scope.rows.concat(data.rows);
                $scope.totalFound = data.totalFound;
            });

        };

        $scope.loadMore = function() {
            $scope.offset += limit;
            $scope.getLatest();
        };

        $scope.moreAvailable = function() {
            return $scope.totalFound > $scope.offset + limit;
        }

        $scope.getLatest();

    };


})();

