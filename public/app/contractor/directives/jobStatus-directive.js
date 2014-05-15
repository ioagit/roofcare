/**
 * Created by isuarez on 4/29/14.
 */
var lookups = require('../../../../server/models/lookups');


/**
 * Created by isuarez on 4/29/14.
 */


(function () {

    'use strict';
    var directiveId = 'jobStatusDirective'
    angular.module('contractor').directive(directiveId, ['lookups', directiveId]);

    function jobStatusDirective(lookups) {

        return {
            scope: {
                status: '@'
            },
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/templates/jobStatus-directive.html',
            link: function(scope, el, attrs) {


                switch(attrs.status)
                {
                    case lookups.jobStatus.workCompleted:
                        scope.labelType = 'primary';
                        break;
                    case lookups.jobStatus.requestAccepted:
                        scope.labelType = 'success';
                        break;
                    case lookups.jobStatus.workStarted:
                        scope.labelType = 'warning';
                        break;
                    case lookups.jobStatus.created:
                        scope.labelType = 'danger';
                        break;
                    default:
                        scope.labelType = 'default';
                }


            }

        };


    };


})();