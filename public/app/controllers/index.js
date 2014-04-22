'use strict';

var path = '../../../public/app/controllers/';

var profileCtrl = require(path + 'account/profileCtrl');

module.exports = angular.module('App.Controllers', [])

    //Account
    //.controller('profileCtrl',  require(npath.join(process.cwd(), 'public', 'app', 'controllers', 'account','profileCtrl')))
    .controller('profileCtrl',  profileCtrl)
    .controller('headerLoginCtrl', require(path + 'account/headerLoginCtrl'))
    .controller('signupCtrl', require(path + 'account/signupCtrl'))

    //Admin

    //roofer
    .controller('rooferDashboardCtrl',require(path + 'roofer/rooferDashboardCtrl'))
    .controller('rooferInboxCtrl',require(path + 'roofer/rooferInboxCtrl'))
    .controller('rooferJobCtrl',require(path + 'roofer/rooferJobCtrl'))
    .controller('rooferKunderCtrl',require(path + 'roofer/rooferKunderCtrl'))
    .controller('rooferRechnungCtrl',require(path + 'roofer/rooferRechnungCtrl'));

