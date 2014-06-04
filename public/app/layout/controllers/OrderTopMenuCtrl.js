(function () { 
    'use strict';
    
    var controllerId = 'OrderTopMenuCtrl';

    angular.module('app').controller(controllerId,
        ['$scope',  'orderWorkFlowSvc', '$location', OrderTopMenuCtrl]);

    function OrderTopMenuCtrl($scope, orderWorkFlowSvc, $location) {

        var vm = this;

        vm.step = 1;

        vm.setStep = function(step) {

            orderWorkFlowSvc.goToStep(step);
        };

        $scope.$on('$routeChangeSuccess', function(event, routeData){
            // Your $routeParams-dependent logic goes here

            var workflowData = orderWorkFlowSvc.getWorkFlowData();

            //if (!workflowData) {
             //   $location.path('/order/start');
             //   return;
            //}

            //Get the latest completed step in the workflow
            var completedStep = orderWorkFlowSvc.completedStep;
            var step = routeData.$$route.settings.step;

           if ( step <= (completedStep + 1) ) {
                vm.step = step;
 }
            else {
                vm.step = completedStep + 1

            }

        });




    }
})();
