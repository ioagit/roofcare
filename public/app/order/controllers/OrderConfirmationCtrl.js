/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderConfirmationCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc','orderWorkFlowSvc', 'orderSvc', OrderConfirmationCtrl]);

    function OrderConfirmationCtrl(commonSvc, orderWorkFlowSvc, orderSvc) {

        var vm = this;

        vm.job = orderWorkFlowSvc.job();
        vm.workFlow = orderWorkFlowSvc.workFlow();

        orderSvc.orderCompleted();



        //function activate() {
        //    commonSvc.activateController([], controllerId);
       // }

        //activate();



    }
})();
