/**
 * Created by isuarez on 4/9/14.
 */

angular.module('App.Routes', [])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        if(CONFIG.routing.html5Mode) {
            $locationProvider.html5Mode(true);
        }
        else {
            var routingPrefix = CONFIG.routing.prefix;
            if(routingPrefix && routingPrefix.length > 0) {
                $locationProvider.hashPrefix(routingPrefix);
            }
        }

        ROUTER.when('roofer_dashboard_path', '/roofer/dashboard', {
            controller : 'rooferDashboardCtrl',
            templateUrl : CONFIG.prepareViewTemplateUrl('roofer/dashboard')
        });

        ROUTER.when('roofer_inbox_path', '/roofer/inbox', {
            controller : 'rooferInboxCtrl',
            templateUrl : CONFIG.prepareViewTemplateUrl('roofer/inbox')
        });

        ROUTER.when('roofer_jobs_path', '/roofer/jobs', {
            controller : 'rooferJobCtrl',
            templateUrl : CONFIG.prepareViewTemplateUrl('roofer/jobs')
        });

        ROUTER.when('roofer_kunden_path', '/roofer/kunden', {
            controller : 'rooferKundenCtrl',
            templateUrl : CONFIG.prepareViewTemplateUrl('roofer/kunden')
        });

        ROUTER.when('roofer_rechnung_path', '/roofer/rechnung', {
            controller : 'rooferRechnungCtrl',
            templateUrl : CONFIG.prepareViewTemplateUrl('roofer/rechnung')
        });

        ROUTER.when('roofer_home_path', '/', {
            controller : 'rooferDashboardCtrl',
            templateUrl : CONFIG.prepareViewTemplateUrl('roofer/dashboard')
        });

        ROUTER.alias('home_path', 'roofer_dashboard_path');

        ROUTER.otherwise({
            redirectTo : '/roofer/dashboard'
        });

        ROUTER.install($routeProvider);
    }]).

    run(['$rootScope', '$location', function($rootScope, $location) {
        var prefix = '';
        if(!CONFIG.routing.html5Mode) {
            prefix = '#' + CONFIG.routing.prefix;
        }
        $rootScope.route = function(url, args) {
            return prefix + ROUTER.routePath(url, args);
        };

        $rootScope.r = $rootScope.route;

        $rootScope.c = function(route, value) {
            var url = ROUTER.routePath(route);
            if(url == $location.path()) {
                return value;
            }
        };
    }]);
