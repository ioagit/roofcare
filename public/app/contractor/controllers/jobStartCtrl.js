/**
 * Created by isuarez on 2/3/14.
 */



(function () {

    'use strict';
    var controllerId = 'ContractorJobStartCtrl';
    angular.module('rc.contractor').controller(controllerId, [ '$routeParams', '$location',
        'contractorSvc', 'commonSvc', 'lookups', 'config', 'translation', ContractorJobStartCtrl]);

    function ContractorJobStartCtrl($routeParams,  $location,  contractorSvc, commonSvc, lookups, config, translation) {

        //Init var
        var vm = this;

        vm.expandedJob = false;

        vm.toggleExpandedJob = function() {
            vm.expandedJob = !vm.expandedJob;
        };



        function saveJob() {

            commonSvc.saveData(config.endpoints.job.create, vm.job, 'PUT')
                .then(successReturn);


            function successReturn(response) {

                if (response.data) {
                    commonSvc.logger.logSuccess(translation.orderSavedSuccess, response.data, 'JobStart', true  );
                    $location.path('/contractor/jobs');
                }


            }


        }

        vm.startJob = function() {
            vm.job.workStarted = Date.now();
            vm.job.status = lookups.jobStatus.workStarted;
            saveJob();


        };


        vm.cancelJob = function() {
           vm.job.status = lookups.jobStatus.workRejected;
           saveJob();

        };



        function onData(data) {
            vm.job = data;
        }





        function activate() {
            commonSvc.activateController([contractorSvc.getJob($routeParams.id).then(onData)], controllerId);
        }

        activate();

    }

})();


