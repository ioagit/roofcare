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

        vm.expandedJob = false;

        vm.toggleExpandedJob = function() {
            vm.expandedJob = !vm.expandedJob;
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


