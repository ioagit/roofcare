(function () { 
    'use strict';
    
    var controllerId = 'OrderTopMenuCtrl';

    angular.module('app').controller(controllerId,
        ['$scope', '$route',  OrderTopMenuCtrl]);

    function OrderTopMenuCtrl($scope, $route) {

        var vm = this;

        vm.step = 1;

        $scope.$on('$routeChangeSuccess', function(event, routeData){
            // Your $routeParams-dependent logic goes here
            vm.step = routeData.$$route.settings.step;
        });

        function getStep() {

            if (!$route.current || !$route.current.settings) {
                return 4;
            }

           vm.step = $route.current.settings.step;


        }

    }
})();
