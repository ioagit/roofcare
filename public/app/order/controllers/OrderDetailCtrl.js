/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderDetailCtrl';

    angular.module('rc.order').controller(controllerId,
        [ 'commonSvc', 'orderWorkFlowSvc', 'lookups', 'orderSvc','translation', OrderDetailCtrl]);

    function OrderDetailCtrl( commonSvc, orderWorkFlowSvc, lookups, orderSvc, translation) {

        var vm = this;

      var canCopyOnSiteToBillingInfo = true;

        vm.job = orderWorkFlowSvc.job();


        vm.canEditOrder = !orderWorkFlowSvc.orderCompleted();

        vm.lookups = lookups;

        vm.translation = translation;


        vm.saveJob = function() {

            vm.formSubmitted = true;

            if (!isFormValid())
                return;

            //adjusting the datetime value
          orderSvc.saveJob(vm.job).then(function(data) {
                if (data)
                    orderWorkFlowSvc.nextStep();
            });

        };



        ///
      vm.copyOnSiteToBillingInfo = function() {
        if (canCopyOnSiteToBillingInfo) {
          vm.job.customer.firstName = vm.job.onSiteContact.firstName;
          vm.job.customer.lastName = vm.job.onSiteContact.lastName;
          vm.job.customer.phone = vm.job.onSiteContact.phone;
        }
      };

      vm.disableCopingToBilling = function() {
        canCopyOnSiteToBillingInfo = false;
      };

        /////////////////////////////
        //////////Validations///////
        ///////////////////////////

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


        vm.isContactFirstNameInvalid = function() {
            return vm.userForm.contactFirstName.$invalid && !vm.userForm.contactFirstName.$pristine && vm.formSubmitted;
        };

        vm.isContactLastNameInvalid = function() {
            return vm.userForm.contactLastName.$invalid && !vm.userForm.contactLastName.$pristine && vm.formSubmitted;
        };

      vm.isContactPhoneInvalid = function() {
        return vm.userForm.contactPhone.$invalid && !vm.userForm.contactPhone.$pristine && vm.formSubmitted;
      };

      vm.isBillingContactFirstNameInvalid = function() {
        return vm.userForm.billingFirst.$invalid && !vm.userForm.billingFirst.$pristine && vm.formSubmitted;
      };

      vm.isBillingContactLastNameInvalid = function() {
        return vm.userForm.billingLast.$invalid && !vm.userForm.billingLast.$pristine && vm.formSubmitted;
      };

      vm.isBillingPhoneInvalid = function() {
        return vm.userForm.billingPhone.$invalid && !vm.userForm.billingPhone.$pristine && vm.formSubmitted;
      };

      vm.isBillingEmailInvalid = function() {
        return vm.userForm.billingEmail.$invalid && !vm.userForm.billingEmail.$pristine && vm.formSubmitted;
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
