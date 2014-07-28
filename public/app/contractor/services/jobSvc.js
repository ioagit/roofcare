/**
 * Created by ioannissuarez on 7/27/14.
 */


/**
 * Created by isuarez on 6/1/14.
 */


(function() {


  var serviceId = 'jobSvc';
  angular.module('rc.contractor').factory(serviceId, ['commonSvc', 'config',  'moment', jobSvc]);

  function jobSvc(commonSvc, config, orderWorkFlowSvc, moment) {

    function fixDateTimeZone(date) {
      var d = new Date(date);
      return moment(d).add('minutes', d.getTimezoneOffset())
    }

    return {


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

            response.data.startDate = fixDateTimeZone(response.data.startDate).format('lll');

            if (response.data.endDate)
              response.data.endDate = response.data(response.data.endDate, 'lll').format('YYYY/MM/DD HH:mm');

            if (job.workStarted)
               job.workStarted = response.data(response.data.workStarted, 'lll').format('YYYY/MM/DD HH:mm');

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