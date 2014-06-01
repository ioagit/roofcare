/**
 * Created by isuarez on 4/29/14.
 */


(function () {

    'use strict';
    var directiveId = 'dashboardJob';
    angular.module('rc.contractor').directive(directiveId, contractorDashboardDirective);

    function contractorDashboardDirective() {

        return {
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/app/contractor/directives/contractorDashboard.html'

        };

    }


})();