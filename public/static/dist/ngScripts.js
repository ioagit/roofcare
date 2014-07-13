require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/**
 * Created by isuarez on 2/27/14.
 */
(function() {

    'use strict';


    var module_list = [

        //Angular modules
        'ngResource',
        'ngRoute',

        //vendors
        'angular-loading-bar',
        'LocalStorageModule',
        'angularMoment',

        'app.translation',
        'app.common'


    ];

    //Adding module base on location patch
    if (location.pathname.indexOf('contractor')== -1) {
        module_list.push('rc.order');
    }
    else {
        module_list.push('rc.contractor');
        module_list.push('rc.account');

    }




    var app = angular.module('app', module_list);


    angular.module('app')
        .config(['localStorageServiceProvider', function(localStorageServiceProvider){
            localStorageServiceProvider.setPrefix('roofCare');
        }]);


    app.run(function($rootScope, $location, config, translation)
    {

        $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
            if (rejection === translation.notAuthorized) {
                $location.path(config.path.contractorPath);
            }
        });

    });

    app.run(function(amMoment) {
        amMoment.changeLanguage('de');
    });
})();




},{}],"m+cUNR":[function(require,module,exports){
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
        loadingDataError: 'loading.data.error',
        savingDataError: 'saving.data.error'
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
        },

        job: {
            create: '/api/job/'
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
        cfg.config.savingDataErrorEvent = config.events.savingDataError;
    }]);
    //#endregion
})();
},{}],"app_config":[function(require,module,exports){
module.exports=require('m+cUNR');
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcbm9kZXByb2plY3RzXFxyb29mY2FyZVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9ub2RlcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9hcHAuanMiLCJDOi9ub2RlcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb25maWcvY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG4vKipcclxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMjcvMTQuXHJcbiAqL1xyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbiAgICB2YXIgbW9kdWxlX2xpc3QgPSBbXHJcblxyXG4gICAgICAgIC8vQW5ndWxhciBtb2R1bGVzXHJcbiAgICAgICAgJ25nUmVzb3VyY2UnLFxyXG4gICAgICAgICduZ1JvdXRlJyxcclxuXHJcbiAgICAgICAgLy92ZW5kb3JzXHJcbiAgICAgICAgJ2FuZ3VsYXItbG9hZGluZy1iYXInLFxyXG4gICAgICAgICdMb2NhbFN0b3JhZ2VNb2R1bGUnLFxyXG4gICAgICAgICdhbmd1bGFyTW9tZW50JyxcclxuXHJcbiAgICAgICAgJ2FwcC50cmFuc2xhdGlvbicsXHJcbiAgICAgICAgJ2FwcC5jb21tb24nXHJcblxyXG5cclxuICAgIF07XHJcblxyXG4gICAgLy9BZGRpbmcgbW9kdWxlIGJhc2Ugb24gbG9jYXRpb24gcGF0Y2hcclxuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKCdjb250cmFjdG9yJyk9PSAtMSkge1xyXG4gICAgICAgIG1vZHVsZV9saXN0LnB1c2goJ3JjLm9yZGVyJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBtb2R1bGVfbGlzdC5wdXNoKCdyYy5jb250cmFjdG9yJyk7XHJcbiAgICAgICAgbW9kdWxlX2xpc3QucHVzaCgncmMuYWNjb3VudCcpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIG1vZHVsZV9saXN0KTtcclxuXHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbmZpZyhbJ2xvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlcicsIGZ1bmN0aW9uKGxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlcil7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2VQcm92aWRlci5zZXRQcmVmaXgoJ3Jvb2ZDYXJlJyk7XHJcbiAgICAgICAgfV0pO1xyXG5cclxuXHJcbiAgICBhcHAucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUsICRsb2NhdGlvbiwgY29uZmlnLCB0cmFuc2xhdGlvbilcclxuICAgIHtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRyb3V0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24oZXZ0LCBjdXJyZW50LCBwcmV2aW91cywgcmVqZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChyZWplY3Rpb24gPT09IHRyYW5zbGF0aW9uLm5vdEF1dGhvcml6ZWQpIHtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKGNvbmZpZy5wYXRoLmNvbnRyYWN0b3JQYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGFwcC5ydW4oZnVuY3Rpb24oYW1Nb21lbnQpIHtcclxuICAgICAgICBhbU1vbWVudC5jaGFuZ2VMYW5ndWFnZSgnZGUnKTtcclxuICAgIH0pO1xyXG59KSgpO1xyXG5cclxuXHJcblxyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyk7XHJcblxyXG4gICAgdmFyIGFwcFZlcnNpb24gPSAxO1xyXG4gICAgdmFyIGFwcFByZWZpeCA9ICcvJztcclxuXHJcblxyXG4gICAgLy8gQ29uZmlndXJlIFRvYXN0clxyXG4gICAgdG9hc3RyLm9wdGlvbnMudGltZU91dCA9IDQwMDA7XHJcbiAgICB0b2FzdHIub3B0aW9ucy5wb3NpdGlvbkNsYXNzID0gJ3RvYXN0LXRvcC1yaWdodCc7XHJcblxyXG4gICAgLy8gRm9yIHVzZSB3aXRoIHRoZSBIb3RUb3dlbC1Bbmd1bGFyLUJyZWV6ZSBhZGQtb24gdGhhdCB1c2VzIEJyZWV6ZVxyXG4gICAgLy92YXIgcmVtb3RlU2VydmljZU5hbWUgPSAnaHR0cDovL2xvY2FsaG9zdC9NZWRpYVB1bHNlQXBpL2JyZWV6ZS9icmVlemUnO1xyXG5cclxuICAgIHZhciBldmVudHMgPSB7XHJcbiAgICAgICAgY29udHJvbGxlckFjdGl2YXRlU3VjY2VzczogJ2NvbnRyb2xsZXIuYWN0aXZhdGVTdWNjZXNzJyxcclxuICAgICAgICBzcGlubmVyVG9nZ2xlOiAnc3Bpbm5lci50b2dnbGUnLFxyXG4gICAgICAgIGxvYWRpbmdEYXRhRXJyb3I6ICdsb2FkaW5nLmRhdGEuZXJyb3InLFxyXG4gICAgICAgIHNhdmluZ0RhdGFFcnJvcjogJ3NhdmluZy5kYXRhLmVycm9yJ1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcGF0aCA9IHtcclxuXHJcbiAgICAgICAgYmFzZURpcmVjdG9yeTogJy8nLFxyXG5cclxuICAgICAgICAvL3RyYW5sYXRpb25cclxuICAgICAgICB0cmFuc2xhdGlvblBhdGg6ICcvYXBpL3RyYW5zbGF0aW9uJyxcclxuXHJcbiAgICAgICAgLy9Db250cmFjdG9yXHJcbiAgICAgICAgY29udHJhY3RvclBhdGg6ICcvY29udHJhY3Rvci9kYXNoYm9hcmQnLFxyXG5cclxuICAgICAgICBob21lUGF0aDogJy9ob21lUGF0aCdcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vZW5kcG9pbnRzXHJcbiAgICB2YXIgZW5kcG9pbnRzID0ge1xyXG5cclxuICAgICAgICBhdXRoOiB7XHJcbiAgICAgICAgICAgIGxvZ2luOiAnL2xvZ2luJyxcclxuICAgICAgICAgICAgbG9nb3V0OiAnL2xvZ291dCdcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICB1c2VyOiAnL2FwaS91c2VycydcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb250cmFjdG9yOiB7XHJcbiAgICAgICAgICAgIGRhc2hib2FyZDogJy9hcGkvY29udHJhY3Rvci9kYXNoYm9hcmQvJyxcclxuICAgICAgICAgICAgaW5ib3g6ICcvYXBpL2NvbnRyYWN0b3IvaW5ib3gvJyxcclxuICAgICAgICAgICAgam9iOiAnL2FwaS9jb250cmFjdG9yL2pvYnMvJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGpvYjoge1xyXG4gICAgICAgICAgICBjcmVhdGU6ICcvYXBpL2pvYi8nXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHBhZ2luYXRpb24gPSAge1xyXG4gICAgICAgIGxpbWl0OiA1XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBsb2NhdGlvbkNvbmZpZ3VyYXRpb24gPSAge1xyXG4gICAgICAgIHByZWZpeCA6ICcnLFxyXG4gICAgICAgIGh0bWw1TW9kZSA6IHRydWVcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB0ZW1wbGF0ZVVybFByZWZpeCA9ICcvdGVtcGxhdGVzLyc7XHJcblxyXG4gICAgdmFyIHZpZXdDb25maWd1cmF0aW9uID0ge1xyXG5cclxuICAgICAgICB2aWV3VXJsUHJlZml4IDogdGVtcGxhdGVVcmxQcmVmaXggKyAndmlld3MvJyxcclxuICAgICAgICBwYXJ0aWFsVXJsUHJlZml4IDogdGVtcGxhdGVVcmxQcmVmaXggKyAncGFydGlhbHMvJyxcclxuICAgICAgICB0ZW1wbGF0ZUZpbGVTdWZmaXggOiAnX3RwbC5odG1sJyxcclxuXHJcbiAgICAgICAgdGVtcGxhdGVEaXJlY3RvcnkgOiAnL3RlbXBsYXRlcy8nLFxyXG4gICAgICAgIHRlbXBsYXRlRmlsZVF1ZXJ5c3RyaW5nIDogJz92PScgKyBhcHBWZXJzaW9uXHJcblxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIGNvbmZpZyA9IHtcclxuICAgICAgICBhcHBFcnJvclByZWZpeDogJ1tSb29mQ2FyZSBFcnJvcl0gJywgLy9Db25maWd1cmUgdGhlIGV4Y2VwdGlvbkhhbmRsZXIgZGVjb3JhdG9yXHJcbiAgICAgICAgZG9jVGl0bGU6ICdSb29mQ2FyZTogJyxcclxuICAgICAgICBldmVudHM6IGV2ZW50cyxcclxuICAgICAgICBlbmRwb2ludHM6IGVuZHBvaW50cyxcclxuICAgICAgICBwYXRoOiBwYXRoLFxyXG4gICAgICAgIHBhZ2luYXRpb246IHBhZ2luYXRpb24sXHJcbiAgICAgICAgdmVyc2lvbjogYXBwVmVyc2lvblxyXG5cclxuICAgICAgICAvL1ZpZXcgYW5kIHRlbXBsYXRlIHJlbGF0ZWQgc3R1ZmZcclxuXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvL2luamVjdGFibGUgaW4gdGhlIGNvbmZpZyBmYXNlLlxyXG4gICAgYXBwLmNvbnN0YW50KCd2aWV3Q29uZmlndXJhdGlvbicsIHZpZXdDb25maWd1cmF0aW9uKTtcclxuICAgIGFwcC5jb25zdGFudCgnbG9jYXRpb25Db25maWd1cmF0aW9uJywgbG9jYXRpb25Db25maWd1cmF0aW9uKTtcclxuXHJcbiAgICBhcHAudmFsdWUoJ2NvbmZpZycsIGNvbmZpZyk7XHJcbiAgICBcclxuICAgIGFwcC5jb25maWcoWyckbG9nUHJvdmlkZXInLCBmdW5jdGlvbiAoJGxvZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgLy8gdHVybiBkZWJ1Z2dpbmcgb2ZmL29uIChubyBpbmZvIG9yIHdhcm4pXHJcbiAgICAgICAgaWYgKCRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XSk7XHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBDb25maWd1cmUgdGhlIGNvbW1vbiBzZXJ2aWNlcyB2aWEgY29tbW9uQ29uZmlnXHJcbiAgICBhcHAuY29uZmlnKFsnY29tbW9uQ29uZmlnUHJvdmlkZXInLCBmdW5jdGlvbiAoY2ZnKSB7XHJcbiAgICAgICAgY2ZnLmNvbmZpZy5jb250cm9sbGVyQWN0aXZhdGVTdWNjZXNzRXZlbnQgPSBjb25maWcuZXZlbnRzLmNvbnRyb2xsZXJBY3RpdmF0ZVN1Y2Nlc3M7XHJcbiAgICAgICAgY2ZnLmNvbmZpZy5zcGlubmVyVG9nZ2xlRXZlbnQgPSBjb25maWcuZXZlbnRzLnNwaW5uZXJUb2dnbGU7XHJcbiAgICAgICAgY2ZnLmNvbmZpZy5sb2FkaW5nRGF0YUVycm9yRXZlbnQgPSBjb25maWcuZXZlbnRzLmxvYWRpbmdEYXRhRXJyb3I7XHJcbiAgICAgICAgY2ZnLmNvbmZpZy5zYXZpbmdEYXRhRXJyb3JFdmVudCA9IGNvbmZpZy5ldmVudHMuc2F2aW5nRGF0YUVycm9yO1xyXG4gICAgfV0pO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcbn0pKCk7Il19
