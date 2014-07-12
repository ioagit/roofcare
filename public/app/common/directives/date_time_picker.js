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
            link: linkFn,
            controller: ['$scope', controllerFn]

            };


        function linkFn(scope, element, attr) {

            element.datetimepicker({language: 'de-DE'});
           // formatDate();

           // element.bind('blur', formatDate);


        }

        function controllerFn($scope) {
            $scope.$watch('date', function (oldValue, newValue) {

                    var dateFormat = 'lll';

                    amDateFormatFilter($scope.date, dateFormat);
                    if (!$scope.date)
                        $scope.date =  amDateFormatFilter(moment().add('days', 7), dateFormat);


            });
        }



        return directive;

    }


})();