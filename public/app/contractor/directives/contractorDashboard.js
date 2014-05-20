/**
 * Created by isuarez on 4/29/14.
 */


(function () {

    'use strict';
    var directiveId = 'contractorDashboardDirective';
    angular.module('rc.contractor').directive(directiveId, contractorDashboardDirective);

    function contractorDashboardDirective() {

        return {
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/app/templates/directives/contractorDashboard.html'

        };

    }


})();