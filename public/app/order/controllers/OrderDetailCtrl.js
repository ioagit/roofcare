/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderDetailCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc', OrderDetailCtrl]);

    function OrderDetailCtrl(commonSvc) {

        var vm = this;

        var workflowData = orderWorkFlowSvc.getWorkFlowData();
        vm.workflow = workflowData.workFlow;
        vm.job = workflowData.job;

        vm.lookups = lookups;

        vm.saveJob = function() {
            orderSvc.saveJob(vm.job).then(function(data) {
                orderWorkFlowSvc.completedStep = 4;
                $location.path('/order/review');
            });

        };


        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
