'use strict';



module.exports = angular.module('App.Controllers', [])

    //Account
    .controller('profileCtrl',  require('./account/profileCtrl'))
    .controller('headerLoginCtrl', require('./account/headerLoginCtrl'))
    .controller('signupCtrl', require('./account/signupCtrl'))

    //main
    .controller('mainOrderStart',require('./main/mainOrderStartCtrl'))


    //roofer
    .controller('rooferDashboardCtrl',require('./../contractor/controllers/rooferDashboardCtrl'))
    .controller('rooferInboxCtrl',require('./../contractor/controllers/rooferInboxCtrl'))
    .controller('rooferJobCtrl',require('./../contractor/controllers/rooferJobCtrl'))
    .controller('rooferJobStartCtrl',require('./../contractor/controllers/rooferJobStartCtrl'))
    .controller('rooferKunderCtrl',require('./../contractor/controllers/rooferKunderCtrl'))
    .controller('rooferRechnungCtrl',require('./../contractor/controllers/rooferRechnungCtrl'));

