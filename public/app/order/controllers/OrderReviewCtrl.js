/**
 * Created by isuarez on 6/1/14.
 */


(function () {
    'use strict';

    var controllerId = 'OrderReviewCtrl';

    angular.module('rc.order').controller(controllerId,
        ['commonSvc', OrderReviewCtrl]);

    function OrderReviewCtrl(commonSvc) {

        var vm = this;

        function activate() {
            commonSvc.activateController([], controllerId);
        }

        activate();



    }
})();
