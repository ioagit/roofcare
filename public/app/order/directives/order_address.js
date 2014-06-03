/**
 * Created by isuarez on 6/3/2014.
 */

(function () {

    'use strict';
    var directiveId = 'orderAddress';
    angular.module('rc.order').directive(directiveId, orderAddress);

    function orderAddress() {

        return {
            scope: true,
            restrict: 'AE',
            replace: 'true',
            templateUrl: '/app/order/directives/order_address.html'

        };

    }


})();
