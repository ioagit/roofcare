/**
 * Created by Rima on 6/14/2014.
 */

(function () {

    'use strict';
    var directiveId = 'rcDateTimePicker';
    angular.module('app.common').directive(directiveId, ['amDateFormatFilter', 'moment', rcDateTimePicker]);

    function rcDateTimePicker(amDateFormatFilter, moment) {

        var directive =  {
           scope: {
               date: '='
            },
            restrict: 'AE',
            replace: 'true',
            template: '<input type="text" ng-model="date" />',
            link: linkFn

            };


        function linkFn(scope, element, attr) {



            element.datetimepicker({language: 'de-DE', format: 'lll'});

            if (attr.showCalendar) {

              element.data('DateTimePicker').show();

            }

            scope.dtEl = element;

        }





        return directive;

    }


})();