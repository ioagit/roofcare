/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderCostCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc', 'orderWorkFlowSvc',  OrderCostCtrl]);

    function OrderCostCtrl(commonSvc, orderWorkFlowSvc) {

        var vm = this;

        var workflowData = orderWorkFlowSvc.getWorkFlowData();
        vm.workflow = workflowData.workFlow;
        vm.job = workflowData.job;

        vm.nextStep = function() {
              orderWorkFlowSvc.completedStep = 3;
              $location.path('/order/detail');
        };


        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
