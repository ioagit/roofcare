/**
 * Created by isuarez on 4/29/14.
 */

'use strict';



module.exports = angular.module('App.Directives', [])

    .directive('jobStatus',  require('./../contractor/directives/jobStatus'))
.directive('dashboardJob',  require('./../contractor/directives/dashboardJob'));

