/**
 * Created by isuarez on 4/29/14.
 */


(function () {

    'use strict';
    var directiveId = 'contractorDashboardDirective';
    angular.module('contractor').directive(directiveId, directiveId);

    function contractorDashboardDirective() {

        return {
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/contractorDashboard.html'

        };

    }


})();