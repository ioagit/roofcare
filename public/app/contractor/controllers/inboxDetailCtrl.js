/**
 * Created by isuarez on 2/3/14.
 */



(function () {

    'use strict';
    var controllerId = 'ContractorInboxDetailCtrl';
    angular.module('rc.contractor').controller(controllerId, [ '$routeParams', '$location', 'contractorSvc',
        'commonSvc', 'config', 'translation', 'lookups',
        ContractorJobStartCtrl]);

    function ContractorJobStartCtrl($routeParams, $location, contractorSvc, commonSvc, config, translation, lookups) {

        //Init var
        var vm = this;


        function onData(data) {
          data.startDate = moment(data.startDate).format('lll');
            vm.job = data;
        }

        function saveJob() {

            commonSvc.saveData(config.endpoints.job.create, vm.job, 'PUT')
                .then(successReturn);


            function successReturn(response) {

                if (response.data) {
                    commonSvc.logger.logSuccess(translation.orderSavedSuccess, response.data, 'InboxDetail', true  );
                    $location.path('/contractor/inbox');
                }


            }

        }

        vm.acceptRequest = function () {
            vm.job.status = lookups.jobStatus.requestAccepted;
            saveJob();
        };


        vm.rejectRequest = function () {
            vm.job.status = lookups.jobStatus.requestRejected;
            saveJob();
        };



        function activate() {
            commonSvc.activateController([contractorSvc.getJob($routeParams.id).then(onData)], controllerId);
        }

        activate();

    }

})();


