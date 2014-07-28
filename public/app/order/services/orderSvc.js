/**
 * Created by isuarez on 6/1/14.
 */


(function() {


    var serviceId = 'orderSvc';
    angular.module('rc.order').factory(serviceId, ['commonSvc', 'config', 'orderWorkFlowSvc', 'moment', orderSvc]);

    function orderSvc(commonSvc, config, orderWorkFlowSvc, moment) {




        return {

            createJob: function (job) {

                if (job._id)
                   return this.saveJob(job);

                var deferred = commonSvc.$q.defer();

                commonSvc.saveData(config.endpoints.job.create, job)
                .then(successReturn);





                function successReturn(response) {

                    if (response.data) {
                        response.data.job.startDate = moment(job.startDate, 'lll').format('lll');
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

                //Formating the date to unix timestamp
               job.startDate = moment(job.startDate, 'lll').format('YYYY/MM/DD HH:mm');


              commonSvc.saveData(config.endpoints.job.create, job, 'PUT')
                    .then(successReturn);


                function successReturn(response) {

                    if (response.data) {

                      response.data.startDate = moment(job.startDate, 'lll').format('lll');
                      orderWorkFlowSvc.job(response.data);
                        deferred.resolve(true);
                    }
                    else
                        deferred.resolve(false);

                }

                return deferred.promise;

            },

            orderCompleted: function() {
                orderWorkFlowSvc.orderCompleted(true);
            }
        }

    }

})();