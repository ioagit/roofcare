/**
 * Created by christopher erker on 4/20/2014.
 */

var path = require('path'),
    Job = require(path.join(process.cwd(), 'server', 'models', 'Job')).Model,
    Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model,
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address')),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
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

        Address.Build(jobData.workSite, function(address) {

            jobData.workSite = address;

            Contractor.FindClosest(address.coordinates, function(err, found) {
                if (found.length == 0) {
                    res.status(400);
                    return res.send({err: err, reason: 'No contractor found '});
                }

                var contractorInfo = found[0];
                jobData.contractor = contractorInfo.id;
                jobData.status = lookUps.jobStatus.created;
                jobData.onSiteContact = {
                    email: 'a@b.com',
                    firstName: 'aaa',
                    lastName: 'aaa',
                    phone:'000-000-0000'
                };

                Job.NextInvoiceNumber(function(invNumber) {
                    jobData.invoice = {
                        number: invNumber,
                        fixedPrice: orderType.fee
                    };

                    Job.create(jobData, function (err, job) {

                        if (err) {
                            res.status(400);
                            return res.send({err: err, reason: err.toString()});
                        }

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

    }
};