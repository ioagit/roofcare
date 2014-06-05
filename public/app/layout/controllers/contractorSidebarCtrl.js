(function () { 
    'use strict';


    //Handlers the Contractor SideBar Nav
    var controllerId = 'ContractorSidebarCtrl';

    angular.module('app').controller(controllerId,
        ['$location', ContractorSidebarCtrl]);


    function ContractorSidebarCtrl($location) {

        var vm = this;

        vm.isRouteCurrent = isRouteCurrent;



        //Gets the current route
        function isRouteCurrent(route) {
            return $location.path().indexOf(route) > 0 ? 'active' : '';
        }
    }
})();
