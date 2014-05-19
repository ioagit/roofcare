/**
 * Created by isuarez on 2/3/14.
 */



(function () {

    'use strict';
    var controllerId = 'ContractorJobCtrl';
    angular.module('rc.contractor').controller(controllerId, ['$scope', 'config', 'contractorSvc', 'commonSvc', ContractorJobCtrl]);

    function ContractorJobCtrl($scope, config, contractorSvc, commonSvc) {

        //Init var
        $scope.offset = 0;
        $scope.rows = [];
        $scope.totalFound = 0;

        var limit = config.pagination.limit;



        $scope.getLatest = function() {



            $scope.data =  contractorSvc.getLatestJobs({limit: limit, offset: $scope.offset });
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
        };


        function activate() {
            commonSvc.activateController([$scope.getLatest()], controllerId);
        }

        activate();


    }


})();


