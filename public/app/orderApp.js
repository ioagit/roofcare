
/**
 * Created by isuarez on 2/27/14.
 */
(function() {

    'use strict';
    var app = angular.module('app',
        [
            //Angular modules
            'ngResource',
            'ngRoute',

            //vendors
            'angular-loading-bar',

            //Custom modules
            'rc.order',
            'app.common',
            //'app.routes',
            'app.translation'

        ]);




    app.run(function($rootScope, $location, config, translation)
    {

        $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
            if (rejection === translation.notAuthorized) {
                $location.path(config.path.contractorPath);
            }
        });

    });

})();



