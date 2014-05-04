/**
 * Created by isuarez on 5/3/14.
 */

module.exports = function dashboardSvc($http, $q) {

    var jobsBaseUrl = '/api/contractor/dashboard/';

    return {

        dashboard: function dashboard() {

            var deferred = $q.defer();


            $http({
                    method: 'GET',
                    url: jobsBaseUrl
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