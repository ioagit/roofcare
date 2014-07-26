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

           //transform starDate to a readable server format.
          //Formating the date to unix timestamp
          vm.job.startDate = moment(vm.job.startDate, 'lll').format('YYYY/MM/DD HH:mm');
          vm.job.endDate = moment(vm.job.endDate, 'lll').format('YYYY/MM/DD HH:mm');
          vm.job.workStarted = moment(vm.job.workStarted, 'lll').format('YYYY/MM/DD HH:mm');


            commonSvc.saveData(config.endpoints.job.create, vm.job, 'PUT')
                .then(successReturn);


            function successReturn(response) {

                if (response.data) {
                    commonSvc.logger.logSuccess(translation.orderSavedSuccess, response.data, 'JobEnd', true  );
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
          data.startDate = moment(data.startDate).format('lll');
          if (data.workStarted)
            data.workStarted = moment(data.workStarted).format('lll');
          if (data.workCompleted)
              data.workCompleted = moment(data.workCompleted).format('lll');

          vm.job = data;


  }


      function activate() {
        commonSvc.activateController([contractorSvc.getJob($routeParams.id).then(onData)], controllerId);
      }

      activate();


    }

})();


