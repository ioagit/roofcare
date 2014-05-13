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


            router.when('main_order_start', '/order_start', {
                controller: 'mainOrderStart',
                templateUrl: config.prepareViewTemplateUrl('main/order_start')
            });


            router.when('roofer_dashboard_path', '/roofer/dashboard', {
                controller: 'rooferDashboardCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/dashboard')
            });

            router.when('roofer_inbox_path', '/roofer/inbox', {
                controller: 'rooferInboxCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/inbox')
            });

            router.when('roofer_jobs_path', '/roofer/jobs', {
                controller: 'rooferJobCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/jobs')
            });

            router.when('roofer_jobs_path', '/roofer/job_start/:id', {
                controller: 'rooferJobStartCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/job_start')
            });

            router.when('roofer_kunden_path', '/roofer/kunden', {
                controller: 'rooferKundenCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/kunden')
            });

            router.when('roofer_rechnung_path', '/roofer/rechnung', {
                controller: 'rooferRechnungCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/rechnung')
            });

            /*
            router.when('roofer_home_path', '/', {
                controller: 'rooferDashboardCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/dashboard')
            });
            */

            //router.alias('home_path', 'roofer_dashboard_path');

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
