(function () { 
    'use strict';
    
    var controllerId = 'OrderTopMenuCtrl';

    angular.module('app').controller(controllerId,
        ['$scope',  'orderWorkFlowSvc', '$location',  OrderTopMenuCtrl]);

    function OrderTopMenuCtrl($scope, orderWorkFlowSvc) {

        var vm = this;

        updateSteps(1);

        vm.setStep = function(step) {

            if (step > orderWorkFlowSvc.completedStep() + 1) {
                return false;
            }

            this.step = step;
            orderWorkFlowSvc.goToStep(step);
        };

        $scope.$on('$routeChangeStart', function(event, routeData, preveous){

            //make user we only proccess in the route has order on it.
            if ( !angular.isUndefined( routeData.$$route ) ) {


                var step = routeData.$$route.settings.step;

                //cancel route change if stpe is more than 2 steps ahead
                if (step > orderWorkFlowSvc.completedStep() + 1) {
                    event.preventDefault();
                    return;
                }

                updateSteps(step);
                // Your $routeParams-dependent logic goes here
                //orderWorkFlowSvc.goToStep(step);
            }

        });


        function updateSteps(step) {
            vm.completedStep = orderWorkFlowSvc.completedStep();
            vm.step = step;
            orderWorkFlowSvc.step(step);

        }


    }
})();
