'use strict';
/**
 * Created by isuarez on 2/27/14.
 */

var app = angular.module('app', ['ngResource', 'ngRoute']);

//Defining Routes
app.config(function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl: '/partials/main', controller: 'mainCtrl'});
    }

);

app.controller('mainCtrl', function($scope) {

    $scope.myVar = "Hola";

} );
