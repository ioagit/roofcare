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

        vm.job = orderWorkFlowSvc.job();
        vm.workFlow = orderWorkFlowSvc.workFlow();


        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
