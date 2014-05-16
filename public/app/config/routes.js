/**
 * Created by isuarez on 4/9/14.
 */

var config = require('app_config');
var router = require('../../../public/app/lib/router.js');


var app_routes = angular.module('App.Routes',[]);

app_routes.config(['$routeProvider', '$locationProvider',

        function ( $routeProvider, $locationProvider) {

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


            router.when('main_order_start', '/order/start', {
                controller: 'mainOrderStart',
                templateUrl: config.prepareViewTemplateUrl('order/order_start')
            });


            router.when('contractor_dashboard_path', '/contractor/dashboard', {
                controller: 'ContractorDashboardCtrl',
                templateUrl: config.prepareViewTemplateUrl('contractor/dashboard')
            });

            router.when('contractor_inbox_path', '/contractor/inbox', {
                controller: 'ContractorInboxCtrl',
                templateUrl: config.prepareViewTemplateUrl('contractor/inbox')
            });

            router.when('contractor_jobs_path', '/contractor/jobs', {
                controller: 'ContractorJobCtrl',
                templateUrl: config.prepareViewTemplateUrl('contractor/jobs')
            });

            router.when('contractor_jobs_path', '/contractor/job_start/:id', {
                controller: 'ContractorJobStartCtrl',
                templateUrl: config.prepareViewTemplateUrl('contractor/job_start')
            });

            router.when('contractor_kunden_path', '/contractor/kunden', {
                controller: 'ContractorKundenCtrl',
                templateUrl: config.prepareViewTemplateUrl('contractor/kunden')
            });

            router.when('contractor_rechnung_path', '/contractor/rechnung', {
                controller: 'ContractorRechnungCtrl',
                templateUrl: config.prepareViewTemplateUrl('contractor/rechnung')
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

            router.install($routeProvider);
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

module.exports = app_routes;
