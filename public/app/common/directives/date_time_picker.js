/**
 * Created by Rima on 6/14/2014.
 */

(function () {

    'use strict';
    var directiveId = 'rcDateTimePicker';
    angular.module('app.common').directive(directiveId, ['amDateFormatFilter', rcDateTimePicker]);

    function rcDateTimePicker(amDateFormatFilter) {

        var directive =  {

            restrict: 'AE',
            replace: 'true',
            template: '<input type="text"  />',
            link: linkFn,
            controller: ['$scope',controllerFn]
            };


        function linkFn(scope, element) {
                element.datetimepicker();

//            scope.$watch ('date', function(oldValue, newValue){
//                if (newValue)
//                    scope.date = amDateFormatFilter(newValue, 'lll');
//            }, true);
        }

        function  controllerFn($scope) {



        }


        return directive;

    }


})();