/**
 * Created by isuarez on 2/3/14.
 */


(function () {

    'use strict';
    var controllerId = 'ContractorDashboardCtrl';
    angular.module('contractor').controller(controllerId, ['$scope', 'contractorSvc', controllerId]);

    function ContractorDashboardCtrl($scope, contractorSvc) {

        $scope.getDashboardData = function() {

            $scope.data =  contractorSvc.getDashboardData();

            $scope.data.then(function(data) {
                $scope.dashboard = data;
                $scope.nextJob = getNextEvent();
            });

        };

        //Run
        $scope.getDashboardData();

        function getNextEvent() {

            if ($scope.dashboard.length === 0)
                return;

            return $scope.dashboard.comingUp[0];

        }


    }


})();

