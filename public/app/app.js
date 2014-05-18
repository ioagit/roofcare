'use strict';
/**
 * Created by isuarez on 2/27/14.
 */

//Main Angular module. Cool
angular.module('app',
                  [
                      //Angular modules
                      'ngResource',
                      'ngRoute',

                      //Custom modules
                      'rc.contractors',
                      'rc.account',
                      'app.common',
                      'app.routes',
                      'app.resources',
                      'app.directives',
                      'app.filters'

                  ]);


angular.module('app').run(function($rootScope, $location, config)
{

    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path(config.path.contractorPath);
        }
    });

});