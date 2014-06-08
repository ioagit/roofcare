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

        vm.workflow = orderWorkFlowSvc.workFlow();
        vm.job = orderWorkFlowSvc.job();

        vm.nextStep = function() {
                orderWorkFlowSvc.nextStep();

        };


        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
