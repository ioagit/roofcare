/**
 * Created by isuarez on 6/1/14.
 */


(function() {
    'use strict';

    var controllerId = 'OrderCheckCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc','lookups', '$location', 'orderSvc',  OrderCheckCtrl]);

    function OrderCheckCtrl(commonSvc, lookups, $location, orderSvc) {

        var vm = this;

        vm.lookups = lookups;

        vm.createJob = function() {

            vm.job.starDate = new Date();
            orderSvc.createJob().then(function(data) {
                $location.url = '/order/cost';
            });

        };

        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
