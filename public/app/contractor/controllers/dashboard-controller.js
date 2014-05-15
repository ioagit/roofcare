/**
 * Created by isuarez on 2/3/14.
 */


(function () {

    'use strict';
    var controllerId = 'contractorDashboardCtrl'
    angular.module('contractor').controller(controllerId, ['$scope', 'contractorDashboardSvc', controllerId]);

    function contractorDashboardCtrl($scope, contractorDashboardSvc) {

        $scope.getDashboardData = function() {

            $scope.data =  contractorDashboardSvc.dashboard();

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


    };


})();

