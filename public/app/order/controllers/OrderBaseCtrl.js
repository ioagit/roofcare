/**
 * Created by Rima on 6/15/2014.
 */



    function OrderBaseCtrl(commonSvc, lookups, orderSvc, orderWorkFlowSvc, translation) {


       //Common variables
        var vm = this;

        vm.formSubmitted = true;

        vm.job = orderWorkFlowSvc.job();

        vm.canEditOrder = !orderWorkFlowSvc.orderCompleted();

        vm.lookups = lookups;

        vm.translation = translation;


        function isFormValid() {
            return vm.userForm.$valid;
        }

        vm.createJob = function() {

            vm.formSubmitted = true;

            if (!isFormValid())
                return;

            orderSvc.createJob(vm.job).then(function(data) {
                if (data)
                    orderWorkFlowSvc.nextStep();
            });
        };



        function activate() {
            commonSvc.activateController([], vm.controllerId);
        }

        activate();



    }
