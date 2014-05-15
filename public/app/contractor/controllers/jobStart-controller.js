/**
 * Created by isuarez on 2/3/14.
 */



(function () {

    'use strict';
    var controllerId = 'contractorJobCtrl'
    angular.module('contractor').controller(controllerId, ['$scope', '$routeParams', 'contractorJobSvc', controllerId]);

    function contractorJobSvc($scope, $routeParams, contractorJobSvc) {

        //Init var

        $scope.getJob = function getJob() {


            $scope.data = contractorJobSvc.getJob($routeParams.id);
            $scope.data.then(function (data) {
                $scope.job = data;
            });

        };


        $scope.getJob();

    }

})();


