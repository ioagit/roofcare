/**
 * Created by christophererker on 4/20/2014.
 */

var path = require('path'),
    Job = require(path.join(process.cwd(), 'server', 'models', 'Job')).Model,
    Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model,
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
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
};

/*
 OrderType should contain:
 duration (in hours)
 price (fixed, not dependant on duration)

 return RequestWorkflow {
     jobId,
     full address object
     invoiceNumber,
     duration, Order Type
     price (EUR), Order Type
     distance (km),
     travelCharge (EUR)
 }
 */
exports.createRequest = function(){
    return function(req,res) {
        var jobData = req.body;

        Address.Build(jobData.WorkSite, function(address) {
            Address.create(address, function (err, finalAddress) {
                if (err) {
                    res.status(400);
                    return res.send({err: err, reason: 'Address: ' + err.toString()});
                }
                jobData.WorkSite = finalAddress.id;

                Contractor.FindClosest(finalAddress.coordinates, function(err, found) {
                    if (err) {
                        res.status(400);
                        return res.send({err: err, reason: 'No contractor found ' + err.toString()});
                    }


                    var contractorInfo = found[0];
                    jobData.Contractor = contractorInfo.id;
                    Job.create(jobData, function (err, job) {

                        if (err) {
                            res.status(400);
                            return res.send({err: err, reason: err.toString()});
                        }
                        var workFlow = {
                            jobId: job.id,
                            WorkSite: finalAddress,
                            invoiceNumber: '0001',
                            duration: 2,
                            price: 90,
                            distance: contractorInfo.distance,
                            travelCharge: contractorInfo.distance * 2.5
                        };
                        res.status(200);
                        res.send(workFlow);
                    })
                });

            })
        });
    }
};

exports.saveRequest = function() {
  return function(req,res) {

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