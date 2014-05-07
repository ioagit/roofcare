/**
 * Created by isuarez on 5/3/14.
 */

module.exports = function jobSvc ($http, $q) {

    var jobsBaseUrl = '/api/contractor/jobs/';


    return {



        getJob: function getLatest(id) {

            var deferred = $q.defer();


            $http({
                    method: 'GET',
                    url: jobsBaseUrl +  id
                }
            ).success(function (data, status, headers, info) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, info) {
                    deferred.reject(status);
                })

            return deferred.promise;

        },


        getLatest: function getLatest(options) {

            var deferred = $q.defer();


            $http({
                    method: 'GET',
                    url: jobsBaseUrl + '?limit='+ options.limit + '&offset=' + options.offset
                }
            ).success(function (data, status, headers, info) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, info) {
                    deferred.reject(status);
                })

            return deferred.promise;

        }
    }

}