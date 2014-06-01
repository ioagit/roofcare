/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderCostCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc', OrderCostCtrl]);

    function OrderCostCtrl(commonSvc) {

        var vm = this;

        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
