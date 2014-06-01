/**
 * Created by isuarez on 2/3/14.
 */


(function () {

    'use strict';
    var controllerId = 'ContractorDashboardCtrl';
    angular.module('rc.contractor').controller(controllerId, ['contractorSvc', 'commonSvc',ContractorDashboardCtrl]);



    function ContractorDashboardCtrl(contractorSvc, commonSvc) {

        var vm = this;

        vm.getDashboardData = function() {

            vm.data =  contractorSvc.getDashboardData();

            vm.data.then(function(data) {
                vm.dashboard = data;
                vm.nextJob = getNextEvent();
            });

        };


        function getNextEvent() {

            if (vm.dashboard.length === 0)
                return;

            return vm.dashboard.comingUp[0];

        }

        function activate() {
            commonSvc.activateController([vm.getDashboardData()], controllerId);
        }

        activate();


    }


})();