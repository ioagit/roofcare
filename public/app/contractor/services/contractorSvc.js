/**
 * Created by isuarez on 5/15/14.
 */

(function () {

    'use strict';
    var serviceId = 'contractorSvc';
    angular.module('rc.contractor').factory(serviceId, ['commonSvc', 'config', contractorSvc]);

    function contractorSvc(commonSvc, config) {

        var jobsBaseUrl = config.endpoints.contractor.dashboard;

        return {



            getDashboardData: function getDashboardData() {
                return commonSvc.getData(config.endpoints.contractor.dashboard);
            },

            getLatestInbox: function getLastestInbox(options) {

                var url = config.endpoints.contractor.inbox + '?limit=' + options.limit + '&offset=' + options.offset;

                return commonSvc.getData(url);

            },

            getLatestJobs: function getLastestJobs(options) {

                var url = config.endpoints.contractor.job + '?limit=' + options.limit + '&offset=' + options.offset;

                return commonSvc.getData(url);

            },

            getJob: function getJob(id) {

                return commonSvc.getData(config.endpoints.contractor.job + id);



            }

        }
    }


})();
