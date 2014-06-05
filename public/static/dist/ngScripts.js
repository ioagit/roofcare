require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"9dpAQ+":[function(require,module,exports){
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
module.exports=require('9dpAQ+');
},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb25maWcvY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcpO1xuXG4gICAgdmFyIGFwcFZlcnNpb24gPSAxO1xuICAgIHZhciBhcHBQcmVmaXggPSAnLyc7XG5cblxuICAgIC8vIENvbmZpZ3VyZSBUb2FzdHJcbiAgICB0b2FzdHIub3B0aW9ucy50aW1lT3V0ID0gNDAwMDtcbiAgICB0b2FzdHIub3B0aW9ucy5wb3NpdGlvbkNsYXNzID0gJ3RvYXN0LXRvcC1yaWdodCc7XG5cbiAgICAvLyBGb3IgdXNlIHdpdGggdGhlIEhvdFRvd2VsLUFuZ3VsYXItQnJlZXplIGFkZC1vbiB0aGF0IHVzZXMgQnJlZXplXG4gICAgLy92YXIgcmVtb3RlU2VydmljZU5hbWUgPSAnaHR0cDovL2xvY2FsaG9zdC9NZWRpYVB1bHNlQXBpL2JyZWV6ZS9icmVlemUnO1xuXG4gICAgdmFyIGV2ZW50cyA9IHtcbiAgICAgICAgY29udHJvbGxlckFjdGl2YXRlU3VjY2VzczogJ2NvbnRyb2xsZXIuYWN0aXZhdGVTdWNjZXNzJyxcbiAgICAgICAgc3Bpbm5lclRvZ2dsZTogJ3NwaW5uZXIudG9nZ2xlJyxcbiAgICAgICAgbG9hZGluZ0RhdGFFcnJvcjogJ2xvYWRpbmcuZGF0YS5lcnJvcicsXG4gICAgICAgIHNhdmluZ0RhdGFFcnJvcjogJ3NhdmluZy5kYXRhLmVycm9yJ1xuICAgIH07XG5cbiAgICB2YXIgcGF0aCA9IHtcblxuICAgICAgICBiYXNlRGlyZWN0b3J5OiAnLycsXG5cbiAgICAgICAgLy90cmFubGF0aW9uXG4gICAgICAgIHRyYW5zbGF0aW9uUGF0aDogJy9hcGkvdHJhbnNsYXRpb24nLFxuXG4gICAgICAgIC8vQ29udHJhY3RvclxuICAgICAgICBjb250cmFjdG9yUGF0aDogJy9jb250cmFjdG9yL2Rhc2hib2FyZCcsXG5cbiAgICAgICAgaG9tZVBhdGg6ICcvaG9tZVBhdGgnXG5cbiAgICB9O1xuXG4gICAgLy9lbmRwb2ludHNcbiAgICB2YXIgZW5kcG9pbnRzID0ge1xuXG4gICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgIGxvZ2luOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIGxvZ291dDogJy9sb2dvdXQnXG5cbiAgICAgICAgfSxcblxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICB1c2VyOiAnL2FwaS91c2VycydcbiAgICAgICAgfSxcblxuICAgICAgICBjb250cmFjdG9yOiB7XG4gICAgICAgICAgICBkYXNoYm9hcmQ6ICcvYXBpL2NvbnRyYWN0b3IvZGFzaGJvYXJkLycsXG4gICAgICAgICAgICBpbmJveDogJy9hcGkvY29udHJhY3Rvci9pbmJveC8nLFxuICAgICAgICAgICAgam9iOiAnL2FwaS9jb250cmFjdG9yL2pvYnMvJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGpvYjoge1xuICAgICAgICAgICAgY3JlYXRlOiAnL2FwaS9qb2IvJ1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdmFyIHBhZ2luYXRpb24gPSAge1xuICAgICAgICBsaW1pdDogNVxuICAgIH07XG5cbiAgICB2YXIgbG9jYXRpb25Db25maWd1cmF0aW9uID0gIHtcbiAgICAgICAgcHJlZml4IDogJycsXG4gICAgICAgIGh0bWw1TW9kZSA6IHRydWVcblxuICAgIH07XG5cbiAgICB2YXIgdGVtcGxhdGVVcmxQcmVmaXggPSAnL3RlbXBsYXRlcy8nO1xuXG4gICAgdmFyIHZpZXdDb25maWd1cmF0aW9uID0ge1xuXG4gICAgICAgIHZpZXdVcmxQcmVmaXggOiB0ZW1wbGF0ZVVybFByZWZpeCArICd2aWV3cy8nLFxuICAgICAgICBwYXJ0aWFsVXJsUHJlZml4IDogdGVtcGxhdGVVcmxQcmVmaXggKyAncGFydGlhbHMvJyxcbiAgICAgICAgdGVtcGxhdGVGaWxlU3VmZml4IDogJ190cGwuaHRtbCcsXG5cbiAgICAgICAgdGVtcGxhdGVEaXJlY3RvcnkgOiAnL3RlbXBsYXRlcy8nLFxuICAgICAgICB0ZW1wbGF0ZUZpbGVRdWVyeXN0cmluZyA6ICc/dj0nICsgYXBwVmVyc2lvblxuXG5cbiAgICB9O1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgYXBwRXJyb3JQcmVmaXg6ICdbUm9vZkNhcmUgRXJyb3JdICcsIC8vQ29uZmlndXJlIHRoZSBleGNlcHRpb25IYW5kbGVyIGRlY29yYXRvclxuICAgICAgICBkb2NUaXRsZTogJ1Jvb2ZDYXJlOiAnLFxuICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgZW5kcG9pbnRzOiBlbmRwb2ludHMsXG4gICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgIHBhZ2luYXRpb246IHBhZ2luYXRpb24sXG4gICAgICAgIHZlcnNpb246IGFwcFZlcnNpb25cblxuICAgICAgICAvL1ZpZXcgYW5kIHRlbXBsYXRlIHJlbGF0ZWQgc3R1ZmZcblxuXG4gICAgfTtcblxuICAgIC8vaW5qZWN0YWJsZSBpbiB0aGUgY29uZmlnIGZhc2UuXG4gICAgYXBwLmNvbnN0YW50KCd2aWV3Q29uZmlndXJhdGlvbicsIHZpZXdDb25maWd1cmF0aW9uKTtcbiAgICBhcHAuY29uc3RhbnQoJ2xvY2F0aW9uQ29uZmlndXJhdGlvbicsIGxvY2F0aW9uQ29uZmlndXJhdGlvbik7XG5cbiAgICBhcHAudmFsdWUoJ2NvbmZpZycsIGNvbmZpZyk7XG4gICAgXG4gICAgYXBwLmNvbmZpZyhbJyRsb2dQcm92aWRlcicsIGZ1bmN0aW9uICgkbG9nUHJvdmlkZXIpIHtcbiAgICAgICAgLy8gdHVybiBkZWJ1Z2dpbmcgb2ZmL29uIChubyBpbmZvIG9yIHdhcm4pXG4gICAgICAgIGlmICgkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKSB7XG4gICAgICAgICAgICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIFxuICAgIC8vI3JlZ2lvbiBDb25maWd1cmUgdGhlIGNvbW1vbiBzZXJ2aWNlcyB2aWEgY29tbW9uQ29uZmlnXG4gICAgYXBwLmNvbmZpZyhbJ2NvbW1vbkNvbmZpZ1Byb3ZpZGVyJywgZnVuY3Rpb24gKGNmZykge1xuICAgICAgICBjZmcuY29uZmlnLmNvbnRyb2xsZXJBY3RpdmF0ZVN1Y2Nlc3NFdmVudCA9IGNvbmZpZy5ldmVudHMuY29udHJvbGxlckFjdGl2YXRlU3VjY2VzcztcbiAgICAgICAgY2ZnLmNvbmZpZy5zcGlubmVyVG9nZ2xlRXZlbnQgPSBjb25maWcuZXZlbnRzLnNwaW5uZXJUb2dnbGU7XG4gICAgICAgIGNmZy5jb25maWcubG9hZGluZ0RhdGFFcnJvckV2ZW50ID0gY29uZmlnLmV2ZW50cy5sb2FkaW5nRGF0YUVycm9yO1xuICAgICAgICBjZmcuY29uZmlnLnNhdmluZ0RhdGFFcnJvckV2ZW50ID0gY29uZmlnLmV2ZW50cy5zYXZpbmdEYXRhRXJyb3I7XG4gICAgfV0pO1xuICAgIC8vI2VuZHJlZ2lvblxufSkoKTsiXX0=
