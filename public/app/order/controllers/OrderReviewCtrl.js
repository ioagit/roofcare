/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderReviewCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc','lookup','orderSvc', '$location', OrderReviewCtrl]);

    function OrderReviewCtrl(commonSvc, lookup,orderSvc, $location) {

        var vm = this;

        vm.saveJob = function() {
            orderSvc.status = lookup.jobStatus.responsePending;
            orderSvc.saveJob(vm.job).then(function(data) {
                orderWorkFlowSvc.completedStep = 5;
                $location.path('/order/confirmation');
            });

        };

        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
