/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderDetailCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc', OrderDetailCtrl]);

    function OrderDetailCtrl(commonSvc) {

        var vm = this;

        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
