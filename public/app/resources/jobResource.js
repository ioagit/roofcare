/**
 * Created by isuarez on 4/20/14.
 */

/**
 * Created by isuarez on 4/10/2014.
 */

/**
 * Created by isuarez on 3/25/14.
 */

module.exports = function jobResource($resource) {

    var JobResource = $resource('/api/contractor/jobs/:id', {_id: '@id'},
        {
            update: {method: 'PUT', isArray:false},
            list:{isArray:true, method:'get',
                transformResponse: function (data, headers) {
                    return JSON.parse(data);
                }}
        }
    );



    return JobResource;
};
