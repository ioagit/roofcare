/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderReviewCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc','lookups','orderSvc','orderWorkFlowSvc', OrderReviewCtrl]);

    function OrderReviewCtrl(commonSvc, lookups,orderSvc, orderWorkFlowSvc) {

        var vm = this;

        var workflowData = orderWorkFlowSvc.getWorkFlowData();
        vm.workflow = workflowData.workFlow;
        vm.job = workflowData.job;


        vm.saveJob = function() {
            orderSvc.status = lookups.jobStatus.responsePending;
            orderSvc.saveJob(vm.job).then(function(data) {
                if (data)
                    orderWorkFlowSvc.nextStep();
            });

        };

        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
