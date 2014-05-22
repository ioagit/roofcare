/**
 * Created by isuarez on 4/9/14.
 */

var config = require('app_config');
var router = require('../../../public/app/lib/router.js');



(function() {

    var app_routes = angular.module('app.routes',[]);

    app_routes.config(['$routeProvider', '$locationProvider', 'config', 'routerSvc',

        function ( $routeProvider, $locationProvider, config, routerSvc) {

            if (config.routing.html5Mode) {
                $locationProvider.html5Mode(true);
            }
            else {
                var routingPrefix = config.routing.prefix;
                if (routingPrefix && routingPrefix.length > 0) {
                    $locationProvider.hashPrefix(routingPrefix);
                }
            }

            /* ************************************
             ********   Main Site Routes *************
             ************************************** */


            routerSvc.when('main_order_start', '/order/start', {
                controller: 'mainOrderStart',
                controllerAs: 'vm',
                templateUrl: routerSvc.prepareViewTemplateUrl('order/order_start', config.template)
            });


            routerSvc.when('contractor_dashboard_path', '/contractor/dashboard', {
                controller: 'ContractorDashboardCtrl',
                controllerAs: 'vm',
                templateUrl: routerSvc.prepareViewTemplateUrl('contractor/dashboard', config.template
                )
            });

            routerSvc.when('contractor_inbox_path', '/contractor/inbox', {
                controller: 'ContractorInboxCtrl',
                controllerAs: 'vm',
                templateUrl: routerSvc.prepareViewTemplateUrl('contractor/inbox', config.template)
            });

            routerSvc.when('contractor_jobs_path', '/contractor/jobs', {
                controller: 'ContractorJobCtrl',
                controllerAs: 'vm',
                templateUrl: routerSvc.prepareViewTemplateUrl('contractor/jobs', config.template)
            });

            routerSvc.when('contractor_jobs_path', '/contractor/job_start/:id', {
                controller: 'ContractorJobStartCtrl',
                controllerAs: 'vm',
                templateUrl: routerSvc.prepareViewTemplateUrl('contractor/job_start', config.template)
            });

            routerSvc.when('contractor_kunden_path', '/contractor/kunden', {
                controller: 'ContractorKundenCtrl',
                controllerAs: 'vm',
                templateUrl: routerSvc.prepareViewTemplateUrl('contractor/kunden', config.template)
            });

            routerSvc.when('contractor_rechnung_path', '/contractor/rechnung', {
                controller: 'ContractorRechnungCtrl',
                controllerAs: 'vm',
                templateUrl: routerSvc.prepareViewTemplateUrl('contractor/rechnung', config.template)
            });

            /*
             router.when('contractor_home_path', '/', {
             controller: 'rooferDashboardCtrl',
             templateUrl: config.prepareViewTemplateUrl('roofer/dashboard')
             });
             */

            //router.alias('home_path', 'contractor_dashboard_path');

            /*
             router.otherwise({
             redirectTo: '/roofer/dashboard'
             });
             */

            routerSvc.install($routeProvider);
        }]);

    app_routes.run([ '$rootScope', '$location', function ( $rootScope, $location) {
        var prefix = '';
        if (!config.routing.html5Mode) {
            prefix = '#' + config.routing.prefix;
        }
        $rootScope.route = function (url, args) {
            return prefix + router.routePath(url, args);
        };

        $rootScope.r = $rootScope.route;

        $rootScope.c = function (route, value) {
            var url = router.routePath(route);
            if (url === $location.path()) {
                return value;
            }
        };
    }]);



})();

