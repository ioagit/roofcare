/**
 * Created by isuarez on 6/1/14.
 */

(function() {



    var serviceId = 'orderWorkFlowSvc';
    angular.module('rc.order').factory(serviceId, [orderWorkFlowSvc]);

    function orderWorkFlowSvc() {



        return {

            workFlowData: {},

            setWorkFlowData: function(workFlowData) {
                this.workFlowData = workFlowData;
            },

            getWorkFlow: function() {
                return this.workFlowData;
            }


        }
    }

}
    )();

