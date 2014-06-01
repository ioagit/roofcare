/**
 * Created by isuarez on 2/3/14.
 */



(function () {

    'use strict';
    var controllerId = 'ContractorJobStartCtrl';
    angular.module('rc.contractor').controller(controllerId, [ '$routeParams', 'contractorSvc', 'commonSvc', ContractorJobStartCtrl]);

    function ContractorJobStartCtrl($routeParams, contractorSvc, commonSvc) {

        //Init var
        var vm = this;

        vm.getJob = function getJob() {


            vm.data = contractorSvc.getJob($routeParams.id);
            vm.data.then(function (data) {
                vm.job = data;
            });

        };


        function activate() {
            commonSvc.activateController([vm.getJob], controllerId);
        }

        activate();

    }

})();


