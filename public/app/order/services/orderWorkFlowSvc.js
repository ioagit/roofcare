/**
 * Created by isuarez on 6/1/14.
 */

(function() {



    var serviceId = 'orderWorkFlowSvc';
    angular.module('rc.order').factory(serviceId, ['$location', 'routes', 'lookups', orderWorkFlowSvc]);

    function orderWorkFlowSvc($location, routes, lookups) {



        return {

            workFlowData: null,

            completedStep: 0,

            step: 1,

            orderType: null,


            setWorkFlowData: function(workFlowData) {
                this.workFlowData = workFlowData;
            },

            getWorkFlowData: function() {
                return this.workFlowData;
            },

            getJob: function() {

              return this.workFlowData && this.workFlowData.job ? this.workFlowData.job : null;

            },

            setJob: function(job) {

                if (this.workFlowData)
                    this.workFlowData.job = job;

            },

            nextStep: function() {

                this.completedStep = this.step;

                this.goToStep(this.completedStep + 1);
            },

            goToStep: function(step) {

                this.step = step;
                $location.path(this.getStepUrl(step));


            },

            getStepUrl: function(step) {

                var orderRoutes = routes.filter(function(r) {
                    return r.config.settings && r.config.settings.type === 'order' &&
                        r.config.settings.step === step ;
                });

                var foundRoutes = orderRoutes.length;
                var url = "/order/start";

                switch (foundRoutes) {
                    case 1:
                        url = orderRoutes[0].url;
                        break;
                    case 2: //for step 2 (check or repair)
                        if (this.orderType && this.orderType === lookups.orderType.repair.name)
                            url = orderRoutes[1].url;
                        else
                            url = orderRoutes[0].url;
                        break;
                }

                return url;



            }




        }
    }

}
    )();

