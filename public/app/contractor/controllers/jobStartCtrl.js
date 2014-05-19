/**
 * Created by isuarez on 2/3/14.
 */



(function () {

    'use strict';
    var controllerId = 'ContractorJobCtrl'
    angular.module('rc.contractor').controller(controllerId, ['$scope', '$routeParams', 'contractorSvc', ContractorJobCtrl]);

    function ContractorJobCtrl($scope, $routeParams, contractorSvc) {

        //Init var

        $scope.getJob = function getJob() {


            $scope.data = contractorSvc.getJob($routeParams.id);
            $scope.data.then(function (data) {
                $scope.job = data;
            });

        };


        $scope.getJob();

    }

})();


