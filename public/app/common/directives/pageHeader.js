/**
 * Created by isuarez on 6/1/14.
 */

/**
 * Created by isuarez on 4/29/14.
 */


(function () {

    'use strict';
    var directiveId = 'pageHeader';
    angular.module('app.common').directive(directiveId, [pageHeaderDirective]);

    function pageHeaderDirective() {

        var directive =  {
            scope: {
                text: '@',
                icon: '@'
            },
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/app/common/directives/pageHeader.html'
        };

        return directive;

    }


})();
