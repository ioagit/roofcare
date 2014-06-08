/**
 * Created by isuarez on 6/1/14.
 */


(function() {
    'use strict';

    var controllerId = 'OrderCheckCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc','lookups',  'orderSvc', 'orderWorkFlowSvc','translation', OrderCheckCtrl]);

    function OrderCheckCtrl(commonSvc, lookups, orderSvc, orderWorkFlowSvc, translation) {

        var vm = this;

        vm.canEditOrder = !orderWorkFlowSvc.orderCompleted();

        vm.translation = translation;

        vm.formSubmitted = false;

        vm.job = orderWorkFlowSvc.job() || {
            propertyType: lookups.propertyType.singleFamily,
            roofType: lookups.roofType.flat,
            orderType: orderWorkFlowSvc.orderType(),
            starDate: new Date(),
            duration: lookups.orderType.check.hours

       };

        vm.lookups = lookups;

        vm.createJob = function() {

            vm.formSubmitted = true;

            if (!isFormValid())
                return;

            orderSvc.createJob(vm.job).then(function(data) {
                if (data)
                    orderWorkFlowSvc.nextStep();
            });
        };


        //validation
        vm.isAddressInvalid = function() {
            return vm.userForm.address.$invalid && !vm.userForm.address.$pristine && vm.formSubmitted;
        };

        vm.isZipCodeInvalid  = function() {
            return vm.userForm.zip.$invalid && !vm.userForm.zip.$pristine && vm.formSubmitted;
        };

        vm.isCityInvalid  = function() {
            return vm.userForm.city.$invalid && !vm.userForm.city.$pristine && vm.formSubmitted;
        };

        function isFormValid() {
            return vm.userForm.$valid;
        }


        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
