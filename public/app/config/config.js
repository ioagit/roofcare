(function () {
    'use strict';

    var app = angular.module('app');

    var appVersion = 1;
    var appPrefix = '/';


    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-top-right';

    // For use with the HotTowel-Angular-Breeze add-on that uses Breeze
    //var remoteServiceName = 'http://localhost/MediaPulseApi/breeze/breeze';

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle',
        loadingDataError: 'loading.data.error'
    };

    var path = {

        baseDirectory: '/',

        //tranlation
        translationPath: '/api/translation',

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

    var locationConfiguration =  {
        prefix : '',
        html5Mode : true

    };

    var templateUrlPrefix = '/templates/';

    var viewConfiguration = {

        viewUrlPrefix : templateUrlPrefix + 'views/',
        partialUrlPrefix : templateUrlPrefix + 'partials/',
        templateFileSuffix : '_tpl.html',

        templateDirectory : '/templates/',
        templateFileQuerystring : '?v=' + appVersion


    };

    var config = {
        appErrorPrefix: '[RoofCare Error] ', //Configure the exceptionHandler decorator
        docTitle: 'RoofCare: ',
        events: events,
        endpoints: endpoints,
        path: path,
        pagination: pagination,
        version: appVersion

        //View and template related stuff


    };

    //injectable in the config fase.
    app.constant('viewConfiguration', viewConfiguration);
    app.constant('locationConfiguration', locationConfiguration);

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
        cfg.config.loadingDataErrorEvent = config.events.loadingDataError;
    }]);
    //#endregion
})();