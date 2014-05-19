/**
 * Created by Christopher Erker on 5/19/14.
 */

var path = require('path'),
    Job = require(path.join(process.cwd(), 'server', 'models', 'Job')).Model,
    Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model,
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address')),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups'));

exports.createRequest = function(){
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
                        var workFlow = {
                            jobId: job.id,
                            workSite: address,
                            invoiceNumber: job.invoice.number,
                            duration: orderType.hours,
                            price: job.invoice.fixedPrice,
                            distance: contractorInfo.distance,
                            travelCharge: contractorInfo.distance * contractorInfo.distanceCharge
                        };
                        res.status(200);
                        res.send(workFlow);
                    })
                });
            });
        });
    }
};

exports.saveRequest = function() {
    return function(req,res) {

    }
};