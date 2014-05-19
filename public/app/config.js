(function () {
    'use strict';

    var app = angular.module('app');

    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-top-right';

    // For use with the HotTowel-Angular-Breeze add-on that uses Breeze
    //var remoteServiceName = 'http://localhost/MediaPulseApi/breeze/breeze';

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var path = {
        //Contractor
        contractorPath: '/contractor/dashboard',

        homePath: '/homePath'

    };


    //endpoints
    var endpoints = {

        auth: {
            login: '/login',
            logout: '/logout'

        },

        user: {
            user: '/api/users'
        },

        contractor: {
            dashboard: '/api/contractor/dashboard/',
            inbox: '/api/contractor/inbox/',
            job: '/api/contractor/jobs/'
        }

    };

    var pagination =  {
        limit: 5
    };

    var config = {
        appErrorPrefix: '[RoofCare Error] ', //Configure the exceptionHandler decorator
        docTitle: 'RoofCare: ',
        events: events,
        endpoints: endpoints,
        path: path,
        pagination: pagination,
        version: '2.1.0'
    };

    app.value('config', config);
    
    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);
    
    //#region Configure the common services via commonConfig
    app.config(['commonConfigProvider', function (cfg) {
        cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
    }]);
    //#endregion
})();