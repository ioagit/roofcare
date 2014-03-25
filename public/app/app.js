'use strict';
/**
 * Created by isuarez on 2/27/14.
 */


//Main Angular module. Cool
var app = angular.module('app', ['ngResource', 'ngRoute']);

//Defining Routes
app.config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl: '/partials/main/main', controller: 'rcMainCtrl'})
            .when('/admin/users', {templateUrl: '/partials/admin/user-list',
                controller: 'rcUserListCtrl',
                resolve: {
                    auth: function (rcIdentitySvc, $q) {
                        if (rcIdentitySvc.currentUser && rcIdentitySvc.currentUser.roles.indexOf('admin') > -1) {
                            return true;
                        }
                        else {
                            return $q.reject('not authorized');
                        }
                    }
                }
            });
    }

);

angular.module('app').run(function($rootScope, $location) {

    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });

});