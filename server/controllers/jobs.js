/**
 * Created by christopher erker on 4/20/2014.
 */

var path = require('path'),
    mongoose = require('mongoose'),
    Job = require(path.join(process.cwd(), 'server', 'models', 'Job')).Model,
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address')),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    mailer = require(path.join(process.cwd(), 'server', 'utils','mailer' )),
    geo = require(path.join(process.cwd(), 'server', 'utils','geo' )),
    translation = require(path.join(process.cwd(), 'server', 'translation','de-de' )),
    moment = require('moment-with-langs.js'),
    async = require('async'),
    _ = require('underscore');

function handleErrorResponse(response, code, msg, err) {
    response.status(code);
    var obj = {reason: msg};
    if (err) obj.err = err;
    return response.send(obj);
}

function sendEmails(job) {



  var jobStatus = lookUps.propertyFromValue(lookUps.jobStatus, job.status);

  moment.lang('de');
  //formatting job date
  job.startDate =  moment(job.startDate).format('lll');

  var locals = {
        email: job.customer.email,
        subject:  translation.emials.subject[jobStatus],
        name: 'Roofcare',
        job: job
    };

    mailer.sendOne('contractor/' + jobStatus, locals, function (err, responseStatus, html) {});
    mailer.sendOne('customer/' + jobStatus, locals, function (err, responseStatus, html) {});
}

function validate(res, jobData, isAnUpdate) {
    if (_.isEmpty(jobData))
        return handleErrorResponse(res, 406, 'Missing job data');

    if (isAnUpdate && _.isEmpty(jobData._id))
        return handleErrorResponse(res, 404, 'Missing job id');

    if (_.isEmpty(jobData.startDate))
        return handleErrorResponse(res, 404, 'Missing: start date');
    else
    {
        var dt = new Date(jobData.startDate);
        if (!_.isDate(dt)) return handleErrorResponse(res, 404, 'Missing: start date');
        if (Date.now() > dt) return handleErrorResponse(res, 406, 'Start date cannot be in the past');
    }
    return null;
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

        var validationError = validate(res, jobData, false);
        if (validationError !== null) return validationError;

        var orderType = lookUps.findOrderTypeByName(jobData.orderType);

        Address.Build(jobData.workSite, function(err, address) {

            if (err) return handleErrorResponse(res, 500, 'Build Address failed', err);

            jobData.workSite = address;

            Contractor.FindClosest(address.coordinates, function(err, found) {

                if (err) return handleErrorResponse(res, 400, 'Find closest contractor failed', err);
                if (found.length == 0) return handleErrorResponse(res, 400, 'No contractor found');

                var contractorInfo = found[0];

                var source = contractorInfo.address.coordinates,
                    destination = address.coordinates;

                geo.getDrivingDistance(source, destination, function(err, distance) {
                    if (err) return handleErrorResponse(res, 400, err.toString(), err);

                    jobData.mapUrl = geo.getStaticMap(source, destination);
                    jobData.contractor = contractorInfo;
                    jobData.status = lookUps.jobStatus.created;
                    jobData.onSiteContact = {};
                    jobData.checkLists = [];

                    Job.NextInvoiceNumber(function(invNumber) {
                        jobData.invoice = {
                            number: invNumber,
                            fixedPrice: orderType.fee,
                            travelCharge: (distance * 2) * contractorInfo.distanceCharge
                        };
                        jobData.distance = distance;

                        Job.create(jobData, function (err, job) {

                            if (err) return handleErrorResponse(res, 400, err.toString(), err);

                            var result = {
                                job: job,
                                workFlow: {
                                    duration: orderType.hours,
                                    distance: job.distance,
                                    travelCharge: job.invoice.travelCharge
                                }
                            };

                            res.status(200);
                            res.send(result);
                        })
                    });
                });
            });
        });
    }
};

exports.saveJob = function() {
    return function(req,res) {
        var jobData = req.body;
        var validationError = validate(res, jobData, true);
        if (validationError !== null) return validationError;

        Job.findById(jobData._id, function(err, job) {
            var currentStatus =  jobData.status;
            var statusChanged = currentStatus !== job.status;
            if (currentStatus == lookUps.jobStatus.created) {
                Address.RefreshCoordinates(job.workSite, jobData.workSite, function (err, coordinates) {
                    if (err)
                        return handleErrorResponse(res, 500, 'Address lookup failure', err);

                    else {
                        jobData.workSite.coordinates = coordinates;
                        Contractor.findById(jobData.contractor, function (err, contractor) {
                            if (err) return handleErrorResponse(res, 400, err.toString(), err);

                            jobData.mapUrl = geo.getStaticMap(contractor.address.coordinates, coordinates);

                            geo.getDrivingDistance(contractor.address.coordinates, coordinates, function (err, distance) {
                                if (err) return handleErrorResponse(res, 500, err.toString(), err);

                                jobData.invoice.travelCharge = (distance * 2) * contractor.distanceCharge;
                                jobData.distance = distance;
                            });
                        });
                    }
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
                if (statusChanged) sendEmails(job);

                res.status(200);
                res.send(result);
            });
        });
    }
};