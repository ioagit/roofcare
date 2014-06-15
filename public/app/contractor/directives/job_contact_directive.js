/**
 * Created by isuarez on 4/29/14.
 */


(function () {

    'use strict';
    var directiveId = 'rcJobContact';
    angular.module('rc.contractor').directive(directiveId, rcJobContact);

    function rcJobContact() {

        return {
            scope: {
                contact: '=',
                icon: '@',
                title: '@',
                description: '@'
            },
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/app/contractor/directives/job_contact_directive.html'

        };

    }


})();