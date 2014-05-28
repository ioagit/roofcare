(function () { 
    'use strict';
    
    var controllerId = 'ContractorSidebarCtrl';

    angular.module('app').controller(controllerId,
        ['$location', ContractorSidebarCtrl]);

    function ContractorSidebarCtrl($location) {

        var vm = this;

        vm.isRouteCurrent = isRouteCurrent;


        function isRouteCurrent(route) {
            return $location.path().indexOf(route) > 0 ? 'active' : '';
        }
    }
})();
