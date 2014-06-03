/**
 * Created by isuarez on 6/1/14.
 */


(function() {
    'use strict';

    var controllerId = 'OrderRepairCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc','lookups', '$location', 'orderSvc', 'orderWorkFlowSvc', OrderRepairCtrl]);

    function OrderRepairCtrl(commonSvc, lookups, $location, orderSvc, orderWorkFlowSvc) {

        var vm = this;

        vm.job = orderWorkFlowSvc.getJob() || {

            propertyType: lookups.propertyType.singleFamily,
            roofType: lookups.roofType.flat,
            orderType: lookups.orderType.repair.name,
            starDate: new Date(),
            duration: lookups.orderType.repair.hours

       };

        vm.lookups = lookups;

        vm.createJob = function() {
            orderSvc.createJob(vm.job).then(function(data) {
                $location.path('/order/kosten');
                return;
            });

        };

        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
