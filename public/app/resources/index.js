'use strict';

var path = '../../public/app/resources/';
module.exports = angular.module('App.Resources', [])

    //Account
    .factory('jobResource',require(path + 'jobResource'))
    .factory('userResource',require(path +  'userResource'));
