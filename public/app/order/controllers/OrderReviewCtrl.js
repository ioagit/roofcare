/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderReviewCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc','lookups','orderSvc','orderWorkFlowSvc', 'translation', OrderReviewCtrl]);

    function OrderReviewCtrl(commonSvc, lookups, orderSvc, orderWorkFlowSvc, translation) {

        var vm = this;

        vm.formSubmitted = true;

        vm.job = orderWorkFlowSvc.job();

        vm.canEditOrder = !orderWorkFlowSvc.orderCompleted();

       //validation
        vm.isOrderAgreementInvalid = function() {
            return vm.userForm.orderAgreement.$invalid && !vm.userForm.orderAgreement.$pristine && vm.formSubmitted;
        };



        function isFormValid() {
            return vm.userForm.$valid;
        }

        vm.saveJob = function() {

            vm.formSubmitted = true;

            if (!isFormValid())
                return;

            vm.job.status = lookups.jobStatus.responsePending;
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
