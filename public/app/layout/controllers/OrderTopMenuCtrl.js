(function () { 
    'use strict';
    
    var controllerId = 'OrderTopMenuCtrl';

    angular.module('app').controller(controllerId,
        ['$route',  OrderTopMenuCtrl]);

    function OrderTopMenuCtrl($route) {

        var vm = this;

        vm.step = getStep();

        function getStep() {

            if (!$route.current || !$route.current.settings) {
                return 4;
            }

           vm.step = $route.current.settings.step;


        }

    }
})();
