/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderDetailCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc', 'orderWorkFlowSvc', 'lookups', 'orderSvc','translation',OrderDetailCtrl]);

    function OrderDetailCtrl(commonSvc, orderWorkFlowSvc, lookups, orderSvc, translation) {

        var vm = this;

        vm.job = orderWorkFlowSvc.getJob();

        vm.lookups = lookups;

        vm.translation = translation;

        //Datetime picker

       angular.element('#datetimepicker').datetimepicker({
            language:  'de'
        });

        vm.saveJob = function() {
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

        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
