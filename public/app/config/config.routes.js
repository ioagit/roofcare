/**
 * Created by isuarez on 4/9/14.
 */


(function() {
    'use strict';

    var app = angular.module('app');

    app.constant('routes', getRoutes());

    function getRoutes() {

        return [



//            routerSvc.when('main_order_start', '/order/start', {
//                controller: 'mainOrderStart',
//                //controllerAs: 'vm',
//                templateUrl: routerSvc.prepareViewTemplateUrl('order/order_start', config.template)
//            });

            {
                url: '/contractor/dashboard',
                config: {

                    controller: 'ContractorDashboardCtrl',
                    controllerAs: 'vm',
                    title: 'Contractor Dashboard',
                    templateUrl: 'contractor/dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },

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



        ]

    }


    var prepareViewTemplateUrl = function(url, options) {

        if (!options)
            return url;

        return options.viewUrlPrefix + url + options.templateFileSuffix +
            options.templateFileQuerystring;
    };

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes','viewConfiguration', routeConfigurator]);
    function routeConfigurator($routeProvider, routes, viewConfiguration) {

        routes.forEach(function (route) {

            //build routes
            if (!route.config || route.config.prepareUrl)
                route.url = prepareViewTemplateUrl(route, viewConfiguration);

            $routeProvider.when(route.url, route.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }


    app.config(['$locationProvider', 'routeConfiguration',

        function ($locationProvider, locationConfiguration) {


            if (locationConfiguration.html5Mode) {
                $locationProvider.html5Mode(true);
            }
            else {
                var routingPrefix = locationConfiguration.prefix;
                if (routingPrefix && routingPrefix.length > 0) {
                    $locationProvider.hashPrefix(routingPrefix);
                }
            }

            /* ************************************
             ********   Main Site Routes *************
             ************************************** */


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

           // routerSvc.install($routeProvider);
        }]);



})();

