/**
 * Created by christophererker on 4/20/2014.
 */

var path = require('path'),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    Job = require(path.join(process.cwd(), 'server', 'models', 'Job')).Model,
    Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model,
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address')).Model,
    async = require('async');


exports.getJob = function() {

    return function (req, res) {
        Job.findById(req.params.id)
          .populate('Customer')
          .populate('WorkSite')
            .exec(function (err, job) {
                if (job)
                   res.send(job);
                else
                  res.status(404).send('Not Found');
            });
    }

}

exports.getJobs = function() {
    return function (req, res) {

        var startingIndex = req.param('offset') || 0;
        var pageSize = req.param('limit') || 10;

        var criteria = {
            customer: req.param('customer'),
            status: req.param('status')
        };

        Job.Filter(Job.QueryJobs(), criteria, function(query)
        {
            query.count( function(err,count){
                query.find()
                    .skip(startingIndex)
                    .limit(pageSize)
                    .populate('Customer')
                    .populate('WorkSite')
                    .exec(function (err, coll) {
                        res.send(JSON.stringify({ totalFound: count, rows: coll }));
                    }
                );
            });
        });
    };
};

exports.getInboxes = function() {
    return function (req, res) {

        var startingIndex = req.param('offset') || 0;
        var pageSize = req.param('limit') || 10;
       // var user = req.user;

        var criteria = {
            customer: req.param('customer'),
            status: req.param('status')
        };

        Job.Filter(Job.QueryInbox(), criteria, function(query)
        {
            query.count( function(err,count){
                query.find()
                    .skip(startingIndex)
                    .limit(pageSize)
                    .populate('Customer')
                    .populate('WorkSite')
                    .exec(function (err, coll) {
                        res.send(JSON.stringify({ totalFound: count, rows: coll }));
                    }
                );
            });
        });
    };
};