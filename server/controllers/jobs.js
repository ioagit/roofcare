/**
 * Created by cerker on 4/20/2014.
 */


//exports.getInbox = function() {};

var path = require('path'),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    Job = require(path.join(process.cwd(), 'server', 'models', 'Job')).Model,
    Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model,
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address')).Model,
    async = require('async');

exports.getJobs = function() {

    return function (req, res) {

        var startingIndex = req.param('offset') || 0;
        var pageSize = req.param('limit') || 10;
        var name = req.param('customer') || '';
        var totalMatches = 0;

        // http://mongoosejs.com/docs/2.7.x/docs/query.html
        var query = Job.QueryJobs();

        async.series(
            [
                function(callback) {
                    if (name === '')
                        callback();
                    else
                    {
                        var namesCriteria =[ {'contactInfo.firstName': name}, {'contactInfo.lastName': name}];
                        var customerIds = [];
                        Customer.find({})
                            .or(namesCriteria)
                            .exec(function (err, coll) {
                            for(var i=0; i< coll.length; i++) {
                                customerIds.push(coll[i].id);
                            }
                            query = query.where('Customer').in(customerIds);
                            callback();
                        });
                    }
                },
                function(callback){
                    query.count( function(err,count){
                        totalMatches = count;
                        callback();
                    });
                },
                function(callback) {
                    query.find()
                        .skip(startingIndex)
                        .limit(pageSize)
                        .populate('Customer')
                        .populate('WorkSite')
                        .exec(function (err, collection) {
                            var resultToSend = {
                                totalFound: totalMatches,
                                jobs: collection
                            };
                            res.send(JSON.stringify(resultToSend));
                            callback();
                        }
                    );
                }
            ]
        );
    };
};