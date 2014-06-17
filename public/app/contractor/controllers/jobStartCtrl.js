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

        vm.showExpandedArea = false;

        vm.toggleExpandedJob = function() {
            vm.showExpandedArea = !vm.showExpandedArea;
        };


        vm.canEditJob = false;


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
            if (vm.job.status === lookups.jobStatus.responsePending) {
                vm.canEditJob = true;
                vm.showExpandedArea = true;
            }

        }





        function activate() {
            commonSvc.activateController([contractorSvc.getJob($routeParams.id).then(onData)], controllerId);
        }

        activate();

    }

})();


