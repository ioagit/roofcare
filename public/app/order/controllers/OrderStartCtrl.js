/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderStartCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc', 'orderWorkFlowSvc', 'lookups', OrderStartCtrl]);

    function OrderStartCtrl(commonSvc, orderWorkFlowSvc, lookups) {

        var vm = this;

        vm.orderType = lookups.orderType;

        vm.nextStep = function (orderType) {

           orderWorkFlowSvc.orderType(orderType);
           orderWorkFlowSvc.nextStep();
        };

        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();


    }
})();
