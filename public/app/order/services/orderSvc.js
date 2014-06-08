/**
 * Created by isuarez on 6/1/14.
 */


(function() {


    var serviceId = 'orderSvc';
    angular.module('rc.order').factory(serviceId, ['commonSvc', 'config', 'orderWorkFlowSvc', orderSvc]);

    function orderSvc(commonSvc, config, orderWorkFlowSvc) {



        return {

            createJob: function (job) {

                if (job._id)
                   return this.saveJob(job);

                var deferred = commonSvc.$q.defer();

                commonSvc.saveData(config.endpoints.job.create, job)
                .then(successReturn);


                function successReturn(response) {

                    if (response.data) {
                        orderWorkFlowSvc.job(response.data.job);
                        orderWorkFlowSvc.workFlow(response.data.workFlow);
                        deferred.resolve(true);
                    }
                    else
                        deferred.resolve(false);

                }

                return deferred.promise;



            },

            saveJob: function (job) {

                var deferred = commonSvc.$q.defer();

                commonSvc.saveData(config.endpoints.job.create, job, 'PUT')
                    .then(successReturn);


                function successReturn(response) {

                    if (response.data) {
                        orderWorkFlowSvc.job(response.data);
                        deferred.resolve(true);
                    }
                    else
                        deferred.resolve(false);

                }

                return deferred.promise;



            }
        }

    }

})();