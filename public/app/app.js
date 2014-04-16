'use strict';
/**
 * Created by isuarez on 2/27/14.
 */


//Main Angular module. Cool
var app = angular.module('App', ['ngResource', 'ngRoute','App.Routes','App.Controllers', 'App.Services', 'App.Resources']);

//Defining Routes
/*
app.config(function ($routeProvider, $locationProvider) {


        var routeRoleChecks = {

            admin: {
                auth: function(rcAuthSvc) {
                    return rcAuthSvc.authorizeCurrentUserForRoute('admin');
                }
            },

            user: {
                auth: function(rcAuthSvc) {
                    return rcAuthSvc.authorizeAuthenticatedUserForRoute();
                }
            }



        };

        $locationProvider.html5Mode(true);

        $routeProvider

            .when('/', {templateUrl: '/partials/main/main',
                        controller: 'rcMainCtrl'})

            .when('/admin/users', {templateUrl: '/partials/admin/user-list',
                                   controller: 'rcUserListCtrl',
                                   resolve: routeRoleChecks.admin
            })

            .when('/signup', {templateUrl: '/partials/account/signup',
                              controller: 'rcSignUpCtrl'})

            .when('/profile',{templateUrl: '/partials/account/profile',
                              controller: 'rcProfileCtrl',
                              resolve: routeRoleChecks.user });
    }

);
*/
angular.module('app').run(function($rootScope, $location) {

    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });

});