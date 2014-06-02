/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderCostCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc', 'orderWorkFlowSvc', '$location', OrderCostCtrl]);

    function OrderCostCtrl(commonSvc, orderWorkFlowSvc, $location) {

        var vm = this;

        var workflowData = orderWorkFlowSvc.getWorkFlowData();
        if (!workflowData) {
            $location.path('/order/check');
            return;
        }

        vm.workflow = workflowData.workFlow;
        vm.job = workflowData.job;


        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
