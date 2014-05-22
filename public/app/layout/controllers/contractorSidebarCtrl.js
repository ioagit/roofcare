(function () { 
    'use strict';
    
    var controllerId = 'contractorSidebarCtrl';
    angular.module('app').controller(controllerId,
        ['$location', 'config', 'routes', contractorSidebarCtrl]);

    function contractorSidebarCtrl($location, config, routes) {

        var vm = this;

        vm.isRouteCurrent = isRouteCurrent;


        function isRouteCurrent(route) {
            return $location.path().indexOf(route) > 0 ? 'active' : '';
        }
    }
})();
