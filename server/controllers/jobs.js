/**
 * Created by christopher erker on 4/20/2014.
 */

var path = require('path'),
    Job = require(path.join(process.cwd(), 'server', 'models', 'Job')).Model,
    Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model,
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address')),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    async = require('async'),
    _ = require('underscore');

function handleErrorResponse(response, code, msg, err) {
    response.status(code);
    var obj = {reason: msg};
    if (err) obj.err = err;
    return response.send(obj);
}

exports.getJob = function () {
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
};

exports.getJobs = function() {
    return function (req, res) {

        var startingIndex = req.param('offset') || 0;
        var pageSize = req.param('limit') || 10;
        var user = req.user;

        var criteria = {
            customer: req.param('customer'),
            status: req.param('status')
        };

        Job.Filter(Job.QueryJobs(user.id), criteria, function(query)
        {
            query.count( function(err,count){
                query.find()
                    .skip(startingIndex)
                    .limit(pageSize)
                    .populate('customer')
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
        var user = req.user;

        var criteria = {
            customer: req.param('customer'),
            status: req.param('status')
        };

        Job.Filter(Job.QueryInbox(user.id), criteria, function(query)
        {
            query.count( function(err,count){
                query.find()
                    .skip(startingIndex)
                    .limit(pageSize)
                    .populate('customer')
                    .sort({startDate: 1})
                    .exec(function (err, coll) {
                        res.send(JSON.stringify({ totalFound: count, rows: coll }));
                    }
                );
            });
        });
    };
};

exports.createJob = function(){
    return function(req,res) {
        var jobData = req.body;
        var orderType = lookUps.findOrderTypeByName(jobData.orderType);

        if (_.isEmpty(orderType))
           return handleErrorResponse(res, 404, 'Missing: order type');

        Address.Build(jobData.workSite, function(err, address) {

            if (err) return handleErrorResponse(res, 500, 'Build Address failed', err);

            jobData.workSite = address;

            Contractor.FindClosest(address.coordinates, function(err, found) {

                if (err) return handleErrorResponse(res, 400, 'Find closest contractor failed', err);
                if (found.length == 0) return handleErrorResponse(res, 400, 'No contractor found');

                var contractorInfo = found[0];
                jobData.contractor = contractorInfo.id;
                jobData.status = lookUps.jobStatus.created;
                jobData.onSiteContact = {};

                Job.NextInvoiceNumber(function(invNumber) {
                    jobData.invoice = {
                        number: invNumber,
                        fixedPrice: orderType.fee
                    };

                    Job.create(jobData, function (err, job) {

                        if (err) return handleErrorResponse(res, 400, err.toString(), err);

                        var result = {
                            job: job,
                            workFlow: {
                                duration: orderType.hours,
                                distance: contractorInfo.distance,
                                travelCharge: contractorInfo.distance * contractorInfo.distanceCharge
                            }
                        };

                        res.status(200);
                        res.send(result);
                    })
                });
            });
        });
    }
};

exports.saveJob = function() {
    return function(req,res) {
        var jobData = req.body;
        if (_.isEmpty(jobData))
            return handleErrorResponse(res, 406, 'Missing job data');

        var jobId = jobData._id;
        if (_.isEmpty(jobId))
            return handleErrorResponse(res, 404, 'Missing job id');

        Job.findById(jobId, function(err, job) {
            var currentStatus =  jobData.status;
            if (currentStatus == lookUps.jobStatus.created) {

                Address.RefreshCoordinates(job.workSite, jobData.workSite, function (err, coordinates) {
                    if (err)
                        return handleErrorResponse(res, 500, 'Address lookup failure', err);

                    else
                        jobData.workSite.coordinates = coordinates;

                });
            } else
                jobData.workSite = job.workSite;

            var keys = _.keys(jobData);
            for(var i in keys)
            {
                var key = keys[i];
                if (key == '_id' || key == '__t' || key == '__v' || key == 'created') continue;

                job[key] = jobData[key];
            }

            job.save(function(err, result) {
                if (err) return handleErrorResponse(res, 500, 'Job save failure', err);

                res.status(200);
                res.send(result);
            });
        });
    }
};