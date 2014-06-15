/**
 * Created by isuarez on 4/29/14.
 */


(function () {

    'use strict';
    var directiveId = 'rcJobAddress';
    angular.module('rc.contractor').directive(directiveId, rcJobAddress);

    function rcJobAddress() {

        return {
            scope: {
                address: '='
            },
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/app/contractor/directives/job_address_directive.html'

        };

    }


})();