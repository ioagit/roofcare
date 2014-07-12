
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


   app.constant('angularMomentConfig', {
    timezone: 'Europe/London' // optional
  });

    app.run(function(amMoment) {
        amMoment.changeLanguage('de');
    });
})();



