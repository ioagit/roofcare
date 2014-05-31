(function () { 

    'use strict';
    
    var controllerId = 'shell';
    angular.module('app').controller(controllerId,
        ['$rootScope', 'commonSvc', 'config', 'translation', shell]);

    function shell($rootScope, commonSvc, config, translation) {

        var vm = this;
        var logSuccess = commonSvc.logger.getLogFn(controllerId, 'success');
        var logError = commonSvc.logger.getLogFn(controllerId, 'error');

        var events = config.events;

        vm.busyMessage = translation.busyMessage;
        vm.isBusy = true;

        vm.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };

        activate();

        function activate() {
            logSuccess(translation.roofCareLoaded, null, true);
            commonSvc.activateController([], controllerId);
        }

        function toggleSpinner(on) { vm.isBusy = on; }

        $rootScope.$on('$routeChangeStart',
            function (event, next, current) { toggleSpinner(true); }
        );
        
        $rootScope.$on(events.controllerActivateSuccess,
            function (data) { toggleSpinner(false); }
        );

        $rootScope.$on(events.spinnerToggle,
            function (evt, data) {
                toggleSpinner(data.show);
            }
        );

        //Handling dataLoading Errors
        $rootScope.$on(events.loadingDataError, function(evt, data) {

            var msg = translation.errrLoadingData;
            switch (data.status) {
                case 404:
                    msg = translation.notFoundError;
                    break;
                case 403:
                    msg = translation.notAuthorizedError;
                    break;
                case 400:
                    msg = translation.badRequestError;
                    break;
            }

            logError(msg, data.status, true);
             toggleSpinner(false);
        });

    }
})();