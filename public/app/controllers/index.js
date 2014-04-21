'use strict';


var path = '../controllers/';

module.exports = angular.module('App.Controllers', [])

    //Account
    .controller('profileCtrl',  require(path + 'account/profileCtrl'))
    .controller('headerLoginCtrl',require(path + 'account/headerLoginCtrl'))
    .controller('signupCtrl',require(path + 'account/signupCtrl'))

    //Admin

    //roofer
    .controller('rooferDashboardCtrl',require(path + 'roofer/rooferDashboardCtrl'))
    .controller('rooferInboxCtrl',require(path + 'roofer/rooferInboxCtrl'))
    .controller('rooferJobCtrl',require(path + 'roofer/rooferJobCtrl'))
    .controller('rooferKunderCtrl',require(path + 'roofer/rooferKunderCtrl'))
    .controller('rooferRechnungCtrl',require(path + 'roofer/rooferRechnungCtrl'));

