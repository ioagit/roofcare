/**
 * Created by isuarez on 4/29/14.
 */


(function () {

    'use strict';
    var directiveId = 'rcJobMetadata';
    angular.module('rc.contractor').directive(directiveId, rcJobMetaData);

    function rcJobMetaData() {

        return {
            scope: {
                job: '='
            },
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/app/contractor/directives/job_metadata_directive.html'

        };

    }


})();