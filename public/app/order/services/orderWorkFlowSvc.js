/**
 * Created by isuarez on 6/1/14.
 */

(function() {



    var serviceId = 'orderWorkFlowSvc';
    angular.module('rc.order').factory(serviceId, [orderWorkFlowSvc]);

    function orderWorkFlowSvc() {



        return {

            workFlowData: null,

            competedStep: 0,

            orderType: null,


            setWorkFlowData: function(workFlowData) {
                this.workFlowData = workFlowData;
            },

            getWorkFlowData: function() {
                return this.workFlowData;
            },

            getJob: function() {

              return this.workflowData && this.workflowData.job ? this.workFlowData.job : null;

            }


        }
    }

}
    )();

