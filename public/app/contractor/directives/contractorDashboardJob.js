/**
 * Created by isuarez on 4/29/14.
 */


(function () {

    'use strict';
    var directiveId = 'contractorDashboardJob';
    angular.module('rc.contractor').directive(directiveId, contractorDashboardJob);

    function contractorDashboardJob() {

        return {
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/app/contractor/directives/contractorDashboardJob.html'

        };

    }


})();