'use strict';

var path = '../../public/app/services/';

module.exports = angular.module('App.Services', [])

    //Account
    .factory('authSvc',require(path + 'authSvc'))
    .factory('indentitySvc',require(path + 'indentitySvc'))
    .factory('notifierSvc',require(path + 'notifierSvc'));
