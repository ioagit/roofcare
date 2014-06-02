/**
 * Created by isuarez on 6/1/14.
 */


(function() {
    'use strict';

    var controllerId = 'OrderCheckCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc','lookups', '$location', 'orderSvc', 'orderWorkFlowSvc', OrderCheckCtrl]);

    function OrderCheckCtrl(commonSvc, lookups, $location, orderSvc, orderWorkFlowSvc) {

        var vm = this;

        vm.job = orderWorkFlowSvc.getJob() || {

            propertyType: lookups.propertyType.singleFamily,
            roofType: lookups.roofType.flat,
            orderType: lookups.orderType.check.name
       };

        vm.lookups = lookups;

        vm.createJob = function() {
            vm.job.orderType = lookups.orderType.check.name;
            vm.job.starDate = new Date();
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
