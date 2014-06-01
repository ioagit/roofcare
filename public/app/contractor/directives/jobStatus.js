/**
 * Created by isuarez on 4/29/14.
 */

/**
 * Created by isuarez on 4/29/14.
 */


(function () {

    'use strict';
    var directiveId = 'jobStatus';
    angular.module('rc.contractor').directive(directiveId, ['lookups', jobStatusDirective]);

    function jobStatusDirective(lookups) {

        return {
            scope: {
                status: '@'
            },
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/app/contractor/directives/jobStatus.html',
            link: function(scope, el, attrs) {

                var status = lookups.jobStatus;

                switch(attrs.status)
                {
                    case status.workCompleted:
                        scope.labelType = 'primary';
                        break;
                    case status.requestAccepted:
                        scope.labelType = 'success';
                        break;
                    case status.workStarted:
                        scope.labelType = 'warning';
                        break;
                    case status.created:
                        scope.labelType = 'danger';
                        break;
                    default:
                        scope.labelType = 'default';
                }


            }

        };


    }


})();