/**
 * Created by isuarez on 4/9/14.
 */


(function() {
    'use strict';

    var app = angular.module('app');

    app.constant('routes', getRoutes());

    function getRoutes() {

        return [


            //order routes
            {
                url: '/order/start',
                config: {

                    controller: 'OrderStartCtrl',
                    controllerAs: 'vm',
                    title: 'Order Start',
                    templateUrl: 'order/start',
                    settings: {
                        type: 'order',
                        step: 1
                    }
                }
            },
            {
                url: '/order/check',
                config: {
                    controller: 'OrderCheckCtrl',
                    controllerAs: 'vm',
                    title: 'Order Check',
                    templateUrl: 'order/check',
                    settings: {
                        type: 'order',
                        step: 2
                    }
                }
            },
            {
                url: '/order/repair',
                config: {
                    controller: 'OrderCheckCtrl',
                    controllerAs: 'vm',
                    title: 'Order repair',
                    templateUrl: 'order/repair',
                    settings: {
                        type: 'order',
                        step: 2
                    }
                }
            },
            {
                url: '/order/kosten',
                config: {

                    controller: 'OrderCostCtrl',
                    controllerAs: 'vm',
                    title: 'Kosten',
                    templateUrl: 'order/cost',
                    settings: {
                        type: 'order',
                        step: 3
                    }
                }
            },
            {
                url: '/order/detail',
                config: {

                    controller: 'OrderDetailCtrl',
                    controllerAs: 'vm',
                    title: 'Detail',
                    templateUrl: 'order/detail',
                    settings: {
                        type: 'order',
                        step: 4
                    }
                }
            },
            {
                url: '/order/review',
                config: {

                    controller: 'OrderReviewCtrl',
                    controllerAs: 'vm',
                    title: 'Review',
                    templateUrl: 'order/review',
                    settings: {
                        type: 'order',
                        step: 5
                    }
                }
            },
            {
                url: '/order/confirmation',
                config: {

                    controller: 'OrderConfirmationCtrl',
                    controllerAs: 'vm',
                    title: 'Confirm',
                    templateUrl: 'order/confirmation',
                    settings: {
                        type: 'order',
                        step: 6
                    }
                }
            },


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

            {
                url: '/contractor/inbox',
                config: {

                    controller: 'ContractorInboxCtrl',
                    controllerAs: 'vmJobs',
                    title: 'Contractor Inbox',
                    templateUrl: 'contractor/inbox',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },
            {
                url: '/contractor/jobs',
                config: {

                    controller: 'ContractorJobCtrl',
                    controllerAs: 'vmJobs',
                    title: 'Contractor Jobs',
                    templateUrl: 'contractor/jobs',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },
            {
                url: '/contractor/job_start/:id',
                config: {
                    controller: 'ContractorJobStartCtrl',
                    controllerAs: 'vm',
                    title: 'Contractor Job Start',
                    templateUrl: '/contractor/job_start',
                    settings: {
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },{
                url: '/contractor/inbox_detail/:id',
                config: {
                    controller: 'ContractorInboxDetailCtrl',
                    controllerAs: 'vm',
                    title: 'Contractor Inbox Detail',
                    templateUrl: '/contractor/inbox_detail',
                    settings: {
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },
            {
                url: '/contractor/kunden',
                config: {
                    controller: 'ContractorKundenCtrl',
                    controllerAs: 'vm',
                    title: 'Contractor Kunden',
                    templateUrl: 'contractor/kunden',
                    settings: {
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },
            {
                url: '/contractor/rechnung',
                config: {
                    controller: 'ContractorRechnungCtrl',
                    controllerAs: 'vm',
                    title: 'Contractor rechnung',
                    templateUrl: 'contractor/rechnung',
                    settings: {
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }

        ]

    }


    var prepareViewTemplateUrl = function(templatePath, options) {

        if (!options)
            return templatePath;

        return options.viewUrlPrefix + templatePath + options.templateFileSuffix +
            options.templateFileQuerystring;
    };

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes','viewConfiguration', routeConfigurator]);

    function routeConfigurator($routeProvider, routes, viewConfiguration) {

        routes.forEach(function (route) {

            //build routes
            if (!route.settings || route.settings.prepareUrl)
                route.config.templateUrl = prepareViewTemplateUrl(route.config.templateUrl, viewConfiguration);

            $routeProvider.when(route.url, route.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }


    app.config(['$locationProvider', 'locationConfiguration',

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

