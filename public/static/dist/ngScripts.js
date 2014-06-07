require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"m+cUNR":[function(require,module,exports){
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
},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcbm9kZXByb2plY3RzXFxyb29mY2FyZVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9ub2RlcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb25maWcvY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcpO1xyXG5cclxuICAgIHZhciBhcHBWZXJzaW9uID0gMTtcclxuICAgIHZhciBhcHBQcmVmaXggPSAnLyc7XHJcblxyXG5cclxuICAgIC8vIENvbmZpZ3VyZSBUb2FzdHJcclxuICAgIHRvYXN0ci5vcHRpb25zLnRpbWVPdXQgPSA0MDAwO1xyXG4gICAgdG9hc3RyLm9wdGlvbnMucG9zaXRpb25DbGFzcyA9ICd0b2FzdC10b3AtcmlnaHQnO1xyXG5cclxuICAgIC8vIEZvciB1c2Ugd2l0aCB0aGUgSG90VG93ZWwtQW5ndWxhci1CcmVlemUgYWRkLW9uIHRoYXQgdXNlcyBCcmVlemVcclxuICAgIC8vdmFyIHJlbW90ZVNlcnZpY2VOYW1lID0gJ2h0dHA6Ly9sb2NhbGhvc3QvTWVkaWFQdWxzZUFwaS9icmVlemUvYnJlZXplJztcclxuXHJcbiAgICB2YXIgZXZlbnRzID0ge1xyXG4gICAgICAgIGNvbnRyb2xsZXJBY3RpdmF0ZVN1Y2Nlc3M6ICdjb250cm9sbGVyLmFjdGl2YXRlU3VjY2VzcycsXHJcbiAgICAgICAgc3Bpbm5lclRvZ2dsZTogJ3NwaW5uZXIudG9nZ2xlJyxcclxuICAgICAgICBsb2FkaW5nRGF0YUVycm9yOiAnbG9hZGluZy5kYXRhLmVycm9yJyxcclxuICAgICAgICBzYXZpbmdEYXRhRXJyb3I6ICdzYXZpbmcuZGF0YS5lcnJvcidcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHBhdGggPSB7XHJcblxyXG4gICAgICAgIGJhc2VEaXJlY3Rvcnk6ICcvJyxcclxuXHJcbiAgICAgICAgLy90cmFubGF0aW9uXHJcbiAgICAgICAgdHJhbnNsYXRpb25QYXRoOiAnL2FwaS90cmFuc2xhdGlvbicsXHJcblxyXG4gICAgICAgIC8vQ29udHJhY3RvclxyXG4gICAgICAgIGNvbnRyYWN0b3JQYXRoOiAnL2NvbnRyYWN0b3IvZGFzaGJvYXJkJyxcclxuXHJcbiAgICAgICAgaG9tZVBhdGg6ICcvaG9tZVBhdGgnXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvL2VuZHBvaW50c1xyXG4gICAgdmFyIGVuZHBvaW50cyA9IHtcclxuXHJcbiAgICAgICAgYXV0aDoge1xyXG4gICAgICAgICAgICBsb2dpbjogJy9sb2dpbicsXHJcbiAgICAgICAgICAgIGxvZ291dDogJy9sb2dvdXQnXHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgdXNlcjogJy9hcGkvdXNlcnMnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29udHJhY3Rvcjoge1xyXG4gICAgICAgICAgICBkYXNoYm9hcmQ6ICcvYXBpL2NvbnRyYWN0b3IvZGFzaGJvYXJkLycsXHJcbiAgICAgICAgICAgIGluYm94OiAnL2FwaS9jb250cmFjdG9yL2luYm94LycsXHJcbiAgICAgICAgICAgIGpvYjogJy9hcGkvY29udHJhY3Rvci9qb2JzLydcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBqb2I6IHtcclxuICAgICAgICAgICAgY3JlYXRlOiAnL2FwaS9qb2IvJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBwYWdpbmF0aW9uID0gIHtcclxuICAgICAgICBsaW1pdDogNVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbG9jYXRpb25Db25maWd1cmF0aW9uID0gIHtcclxuICAgICAgICBwcmVmaXggOiAnJyxcclxuICAgICAgICBodG1sNU1vZGUgOiB0cnVlXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgdGVtcGxhdGVVcmxQcmVmaXggPSAnL3RlbXBsYXRlcy8nO1xyXG5cclxuICAgIHZhciB2aWV3Q29uZmlndXJhdGlvbiA9IHtcclxuXHJcbiAgICAgICAgdmlld1VybFByZWZpeCA6IHRlbXBsYXRlVXJsUHJlZml4ICsgJ3ZpZXdzLycsXHJcbiAgICAgICAgcGFydGlhbFVybFByZWZpeCA6IHRlbXBsYXRlVXJsUHJlZml4ICsgJ3BhcnRpYWxzLycsXHJcbiAgICAgICAgdGVtcGxhdGVGaWxlU3VmZml4IDogJ190cGwuaHRtbCcsXHJcblxyXG4gICAgICAgIHRlbXBsYXRlRGlyZWN0b3J5IDogJy90ZW1wbGF0ZXMvJyxcclxuICAgICAgICB0ZW1wbGF0ZUZpbGVRdWVyeXN0cmluZyA6ICc/dj0nICsgYXBwVmVyc2lvblxyXG5cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBjb25maWcgPSB7XHJcbiAgICAgICAgYXBwRXJyb3JQcmVmaXg6ICdbUm9vZkNhcmUgRXJyb3JdICcsIC8vQ29uZmlndXJlIHRoZSBleGNlcHRpb25IYW5kbGVyIGRlY29yYXRvclxyXG4gICAgICAgIGRvY1RpdGxlOiAnUm9vZkNhcmU6ICcsXHJcbiAgICAgICAgZXZlbnRzOiBldmVudHMsXHJcbiAgICAgICAgZW5kcG9pbnRzOiBlbmRwb2ludHMsXHJcbiAgICAgICAgcGF0aDogcGF0aCxcclxuICAgICAgICBwYWdpbmF0aW9uOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgIHZlcnNpb246IGFwcFZlcnNpb25cclxuXHJcbiAgICAgICAgLy9WaWV3IGFuZCB0ZW1wbGF0ZSByZWxhdGVkIHN0dWZmXHJcblxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy9pbmplY3RhYmxlIGluIHRoZSBjb25maWcgZmFzZS5cclxuICAgIGFwcC5jb25zdGFudCgndmlld0NvbmZpZ3VyYXRpb24nLCB2aWV3Q29uZmlndXJhdGlvbik7XHJcbiAgICBhcHAuY29uc3RhbnQoJ2xvY2F0aW9uQ29uZmlndXJhdGlvbicsIGxvY2F0aW9uQ29uZmlndXJhdGlvbik7XHJcblxyXG4gICAgYXBwLnZhbHVlKCdjb25maWcnLCBjb25maWcpO1xyXG4gICAgXHJcbiAgICBhcHAuY29uZmlnKFsnJGxvZ1Byb3ZpZGVyJywgZnVuY3Rpb24gKCRsb2dQcm92aWRlcikge1xyXG4gICAgICAgIC8vIHR1cm4gZGVidWdnaW5nIG9mZi9vbiAobm8gaW5mbyBvciB3YXJuKVxyXG4gICAgICAgIGlmICgkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfV0pO1xyXG4gICAgXHJcbiAgICAvLyNyZWdpb24gQ29uZmlndXJlIHRoZSBjb21tb24gc2VydmljZXMgdmlhIGNvbW1vbkNvbmZpZ1xyXG4gICAgYXBwLmNvbmZpZyhbJ2NvbW1vbkNvbmZpZ1Byb3ZpZGVyJywgZnVuY3Rpb24gKGNmZykge1xyXG4gICAgICAgIGNmZy5jb25maWcuY29udHJvbGxlckFjdGl2YXRlU3VjY2Vzc0V2ZW50ID0gY29uZmlnLmV2ZW50cy5jb250cm9sbGVyQWN0aXZhdGVTdWNjZXNzO1xyXG4gICAgICAgIGNmZy5jb25maWcuc3Bpbm5lclRvZ2dsZUV2ZW50ID0gY29uZmlnLmV2ZW50cy5zcGlubmVyVG9nZ2xlO1xyXG4gICAgICAgIGNmZy5jb25maWcubG9hZGluZ0RhdGFFcnJvckV2ZW50ID0gY29uZmlnLmV2ZW50cy5sb2FkaW5nRGF0YUVycm9yO1xyXG4gICAgICAgIGNmZy5jb25maWcuc2F2aW5nRGF0YUVycm9yRXZlbnQgPSBjb25maWcuZXZlbnRzLnNhdmluZ0RhdGFFcnJvcjtcclxuICAgIH1dKTtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG59KSgpOyJdfQ==
