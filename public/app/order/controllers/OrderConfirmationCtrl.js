/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderConfirmationCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc', OrderConfirmationCtrl]);

    function OrderConfirmationCtrl(commonSvc) {

        var vm = this;

        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
