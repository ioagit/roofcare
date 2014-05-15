/**
 * Created by isuarez on 2/3/14.
 */



(function () {

    'use strict';
    var controllerId = 'contractorJobCtrl'
    angular.module('contractor').controller(controllerId, ['$scope', 'config', 'contractorJobSvc', controllerId]);

    function contractorJobCtrl($scope, config, contractorJobSvc) {

        //Init var
        $scope.offset = 0;
        $scope.rows = []
        $scope.totalFound = 0;

        var limit = config.pagination.limit;



        $scope.getLatest = function() {



            $scope.data =  contractorJobSvc.getLatest({limit: limit, offset: $scope.offset });
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
            return $scope.totalFound > $scope.offset + limit;
        }

        $scope.getLatest();

    };


})();


