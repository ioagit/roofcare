/**
 * Created by isuarez on 5/15/14.
 */

(function () {

    'use strict';
    var serviceId = 'contractorSvc';
    angular.module('rc.contractor').factory(serviceId, ['commonSvc', 'config', 'moment', contractorSvc]);

    function contractorSvc(commonSvc, config, moment) {

        var jobsBaseUrl = config.endpoints.contractor.dashboard;

      function fixDateTimeZone(date) {
        var d = new Date(date);
        return moment(d).add('minutes', d.getTimezoneOffset())
      }

      function parseDates(job) {

        job.startDate = moment(job.startDate).format('lll');

        if (job.endDate)
          job.endDate = moment(job.endDate).format('lll');

        if (job.workStarted)
          job.workStarted = moment(job.workStarted).format('lll');


      }

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

              var deferred = commonSvc.$q.defer();

              commonSvc.getData(config.endpoints.contractor.job + id).then(getSuccessReturn);

              function getSuccessReturn(response) {

                if (response) {

                  parseDates(response);

                  deferred.resolve(response);
                }
                else
                  deferred.resolve(null);

              }

              return deferred.promise;


            },

          saveJob: function (job) {

            var deferred = commonSvc.$q.defer();

            //Formating the date to unix timestamp
            job.startDate = moment(job.startDate, 'lll').format('YYYY/MM/DD HH:mm');

            if (job.endDate)
              job.endDate = moment(job.endDate, 'lll').format('YYYY/MM/DD HH:mm');

            if (job.workStarted)
              job.workStarted = moment(job.workStarted, 'lll').format('YYYY/MM/DD HH:mm');



            commonSvc.saveData(config.endpoints.job.create, job, 'PUT')
              .then(successReturn);


            function successReturn(response) {

              if (response.data) {

                parseDates(response.data);

                deferred.resolve(response.data);
              }
              else
                deferred.resolve(null);

            }

            return deferred.promise;

          }

        }
    }


})();
