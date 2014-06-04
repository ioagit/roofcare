/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderConfirmationCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc','orderWorkFlowSvc', OrderConfirmationCtrl]);

    function OrderConfirmationCtrl(commonSvc, orderWorkFlowSvc) {

        var vm = this;

        var workflowData = orderWorkFlowSvc.getWorkFlowData();
        vm.job = workflowData.job;
        vm.workFlow = workflowData.workFlow;


        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
