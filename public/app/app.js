
/**
 * Created by isuarez on 2/27/14.
 */
(function() {

    'use strict';
    angular.module('app',
        [
            //Angular modules
            'ngResource',
            'ngRoute',

            //Custom modules
            //'rc.contractor',
            'rc.account',
            'app.common',
            //'app.routes',
            'app.translation'

        ]);


    angular.module('app').run(function($rootScope, $location, config)
    {

        $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path(config.path.contractorPath);
            }
        });

    });

})();



