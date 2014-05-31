(function () {
    'use strict';

    // Must configure the common service and set its 
    // events via the commonConfigProvider

    angular.module('app.common')
        .factory('spinner', ['commonSvc', 'commonConfig', spinner]);

    function spinner(commonSvc, commonConfig) {
        var service = {
            spinnerHide: spinnerHide,
            spinnerShow: spinnerShow
        };

        return service;

        function spinnerHide() { spinnerToggle(false); }

        function spinnerShow() { spinnerToggle(true); }

        function spinnerToggle(show) {
            commonSvc.$broadcast(commonConfig.config.spinnerToggleEvent, { show: show });
        }
    }
})();