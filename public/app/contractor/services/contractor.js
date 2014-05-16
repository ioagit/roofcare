/**
 * Created by isuarez on 5/15/14.
 */

(function () {

    'use strict';
    var serviceId = 'contractorSvc';
    angular.module('contractor').controller(serviceId, ['commonSvc', 'config', serviceId]);

    function contractorService(commonSvc, config) {

        var jobsBaseUrl = config.endPoints.contractor.dashboard;
        //'/api/contractor/dashboard/';
        // '/api/contractor/inbox/';
        //var jobsBaseUrl = '/api/contractor/jobs/';

        return {



            getDashboardData: function getDashboardData() {
                return commonSvc.getData(config.endPoints.contractor.dashboard);
            },

            getLatestInbox: function getLastestInbox(options) {

                var url = config.endPoints.contractor.inbox + '?limit=' + options.limit + '&offset=' + options.offset;

                return commonSvc.getData(url);

            },

            getLatestJobs: function getLastestJobs(options) {

                var url = config.endPoints.contractor.job + '?limit=' + options.limit + '&offset=' + options.offset;

                return commonSvc.getData(url);

            },

            getJob: function getJob(id) {

                return commonSvc.getData(config.endPoints.contractor.job + id);



            }

        }
    }


})();
