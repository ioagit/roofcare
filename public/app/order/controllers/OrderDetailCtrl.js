/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderDetailCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc', 'orderWorkFlowSvc', 'lookups', 'orderSvc',OrderDetailCtrl]);

    function OrderDetailCtrl(commonSvc, orderWorkFlowSvc, lookups, orderSvc) {

        var vm = this;

        vm.job = orderWorkFlowSvc.getJob();

        vm.lookups = lookups;

        //Datetime picker

//        angular.element('#datetimepicker').datetimepicker({
//            language:  'de',
//            format: 'yyyy-mm-dd hh:ii'
//        });

        vm.saveJob = function() {
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
