/**
 * Created by isuarez on 5/3/14.
 */

module.exports = function inboxSvc($http, $q) {

    var baseUrl = '/api/contractor/inbox/';


    return {



        getLatest: function getLastest(options) {

            var deferred = $q.defer();


            $http({
                    method: 'GET',
                    url: baseUrl + '?limit=' + options.limit + '&offset=' + options.offset
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