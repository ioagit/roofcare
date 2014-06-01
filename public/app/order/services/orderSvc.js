/**
 * Created by isuarez on 6/1/14.
 */


(function() {


    var serviceId = 'orderSvc';
    angular.module('rc.order').factory(serviceId, ['commonSvc', 'config', 'orderWorkFlowSvc', orderSvc]);

    function orderSvc(commonSvc, config, orderWorkFlowSvc) {


        return {

            createJob: function (job) {

                var deferred = commonSvc.$q.defer();
                commonSvc.$http.post(config.endpoints.job.create, job)

                    .then(function (data) {
                        if (data) {
                            orderWorkFlowSvc.setWorkFlowData(data);
                            deferred.resolve(true);
                        }
                        else
                            deferred.resolve(false);

                    });
                return deferred.promise;
            }


        };

    }

})();