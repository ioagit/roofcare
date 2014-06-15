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

        vm.job = orderWorkFlowSvc.job();


        vm.canEditOrder = !orderWorkFlowSvc.orderCompleted();

        vm.lookups = lookups;

        vm.translation = translation;


        vm.saveJob = function() {

            vm.formSubmitted = true;

            if (!isFormValid())
                return;

            //adjusting the datetime value
            //vm.job.startDate = stripEndFilter(vm.job.startDate, 'Uhr');

            orderSvc.saveJob(vm.job).then(function(data) {
                if (data)
                    orderWorkFlowSvc.nextStep();
            });

        };




        vm.isContactFirstNameInvalid = function() {
            return vm.userForm.contactFirstName.$invalid && !vm.userForm.contactFirstName.$pristine && vm.formSubmitted;
        };

        vm.isContactLastNameInvalid = function() {
            return vm.userForm.contactLastName.$invalid && !vm.userForm.contactLastName.$pristine && vm.formSubmitted;
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
