/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderConfirmationCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc', OrderConfirmationCtrl]);

    function OrderConfirmationCtrl(commonSvc) {

        var vm = this;

        var workflowData = orderWorkFlowSvc.getWorkFlowData();
        vm.workflow = workflowData.workFlow;
        vm.job = workflowData.job;


        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
