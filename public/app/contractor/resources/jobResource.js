/**
 * Created by isuarez on 4/20/14.
 */

/**
 * Created by isuarez on 4/10/2014.
 */

/**
 * Created by isuarez on 3/25/14.
 */

(function() {

    angular.module('rc.contractor')
        .factory('jobResource', ['$resource', 'config', jobResource]);


    function jobResource($resource) {

        var JobResource = $resource(config.endpoints.contractor.job + ':id', {_id: '@id'},
            {
                update: {method: 'PUT', isArray: false},
                list: {isArray: true, method: 'get',
                    transformResponse: function (data, headers) {
                        return JSON.parse(data);
                    }}
            }
        );


        return JobResource;
    }

})();