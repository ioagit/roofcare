'use strict';
/**
 * Created by isuarez on 2/27/14.
 */

//We are getting angualr from cdn
var
    app_routes = require('../../public/app/config/routes.js'),
    controllers = require('../../public/app/controllers'),
    services = require('../../public/app/services'),
    resources = require('../../public/app/resources'),
    directives = require('../../public/app/directives'),
    filters = require('../../public/app/filters');


//Main Angular module. Cool
angular.module('app',
                  ['ngResource', 'ngRoute',
                  controllers.name, services.name, app_routes.name, resources.name, directives.name, filters.name]);


angular.module('app').run(function($rootScope, $location)
{

    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });

});