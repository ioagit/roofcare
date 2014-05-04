'use strict';

module.exports = angular.module('App.Services', [])

    //Account
    .factory('authSvc',require('./authSvc'))
    .factory('identitySvc',require('./identitySvc'))
    .factory('jobSvc',require('./roofer/jobSvc'))
    .factory('inboxSvc',require('./roofer/inboxSvc'))
    .factory('dashboardSvc',require('./roofer/dashboardSvc'))

    .factory('notifierSvc',require('./notifierSvc'));
