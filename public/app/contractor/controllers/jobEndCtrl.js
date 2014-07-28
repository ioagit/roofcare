/**
 * Created by isuarez on 2/3/14.
 */



(function () {

    'use strict';
    var controllerId = 'ContractorJobEndCtrl';
    angular.module('rc.contractor').controller(controllerId, [ '$routeParams', '$location',
        'contractorSvc', 'commonSvc', 'lookups', 'config', 'translation', ContractorJobEndCtrl]);

    function ContractorJobEndCtrl($routeParams,  $location,  contractorSvc, commonSvc, lookups, config, translation) {

        //Init var
        var vm = this;


        vm.canEditJob = true;



        function saveJob() {

          contractorSvc.saveJob( vm.job)
            .then(successReturn);


          function successReturn(response) {

            if (response) {
              commonSvc.logger.logSuccess(translation.orderSavedSuccess, response, 'JobEnd', true  );
              $location.path('/contractor/jobs');
            }


          }


        }

       vm.clearSignature = function() {

       };

        vm.endJob = function() {

            vm.job.status = lookups.jobStatus.workCompleted;
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


