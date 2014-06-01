/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderStartCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc',  OrderStartCtrl]);

    function OrderStartCtrl(commonSvc) {

        var vm = this;

        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();


    }
})();
