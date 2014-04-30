/**
 * Created by isuarez on 4/29/14.
 */
var lookups = require('../../../server/models/lookups');

module.exports = function jobStatus() {
    return {
        scope: {
            status: '@',
            type: '@'
        },
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/templates/directives/jobStatus.html'
    };
}