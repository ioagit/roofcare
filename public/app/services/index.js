'use strict';

module.exports = angular.module('App.Services', [])

    //Account
    .factory('authSvc',require('./authSvc'))
    .factory('identitySvc',require('./identitySvc'))
    .factory('jobSvc',require('./jobSvc'))
    .factory('inboxSvc',require('./inboxSvc'))

    .factory('notifierSvc',require('./notifierSvc'));
