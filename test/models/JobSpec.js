/**
 * Created by christophererker on 4/28/14.
 */

var mongoose = require('mongoose'),
    expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    jobs = require(path.join(process.cwd(), 'server', 'models', 'Job'));

describe('Model - Job', function () {

    var Job = jobs.Model;

    it('Should exist', function(done){

        expect(Job).to.not.be.null;
        done();
    });

    it('NextInvoiceNumber should return 203', function(done){
       Job.NextInvoiceNumber(function(invNumber){
           expect(invNumber).to.eq('RC00000203');
           done();
       });
    });

    it('invoice total should equal distance change and fixed fee', function(done) {
        Job.find().limit(10).exec(function(err, jobs) {
            for(var i=0; i < jobs.length; i++) {
                var job = jobs[i];
                expect(job.invoice.total).to.eq(job.invoice.distanceCharge + job.invoice.fixedPrice);
            }
            done();
        });
    });

    it ('Should return the next page of 10 rows', function(done) {
       Job.find({})
           .limit(10)
           .skip(5)
           .populate('contractor')
           .exec(function (err, collection) {
               expect(collection.length).to.be.eq(10);
               done();
           });
    });

    it ('Should return a job with only specified filter', function(done) {
        Job.find({status: {
                $nin: [ lookUps.jobStatus.created,
                        lookUps.jobStatus.unknown,
                        lookUps.jobStatus.workRejected ]}
            })
            .exec(function(err, coll) {
                for(var i=0; i<coll.length; i++)
                {
                    var success = coll[i].status !== lookUps.jobStatus.created &&
                        coll[i].status !== lookUps.jobStatus.unknown &&
                        coll[i].status !== lookUps.jobStatus.workRejected;

                    expect(success).to.be.true;
                }
                done();
            });
    });

    it('Should return jobs sorted by StartDate', function(done) {
        var now = new Date();
        var start = now.toDateString();
        now.setDate(now.getDate() + 7);
        var end = now.toDateString();

        Job.find(
            {
                'startDate':  {"$gte": start, "$lt": end},
                'status': lookUps.jobStatus.requestAccepted
            })
            .sort('startDate')
            .select('startDate')

            .exec(function (err, coll) {
                var current = new Date();
                for(var i = 0; i < coll.length; i++)
                {
                    expect(current).to.be.below(coll[i].startDate);
                    current = coll[i].startDate;
                }
                done();
            });
    });

    it('Should aggregate on Status for Dashboard', function(done) {
        var dashBoard = { inbox: {}, jobs: {} };
        Job.aggregate(
            {$group: {_id: {status: '$status'}, count: {$sum: 1}}}
        )
            .exec(function (err, groupings) {

                for(var i=0; i < groupings.length; i++) {
                    var status = groupings[i]._id.status;
                    var count = groupings[i].count;

                    switch (status) {
                        case lookUps.jobStatus.created:
                            dashBoard.inbox.request = count;
                            break;

                        case lookUps.jobStatus.requestAccepted:
                            dashBoard.inbox.total = count;
                            break;

                        case lookUps.jobStatus.workCompleted:
                            dashBoard.jobs.completed = count;
                            break;

                        case lookUps.jobStatus.workStarted:
                            dashBoard.jobs.started = count;
                            break;

                        case lookUps.jobStatus.workRejected:
                            dashBoard.jobs.rejected = count;
                            break;
                    }
                }
                console.log(dashBoard);
                done();
            });
    });

    it('Should return a job with linked Customer and WorkSite', function(done){
        Job.find({})
            .limit(1)
            .populate('contractor')
            .exec(function (err, collection) {

                var job = collection[0];
                expect(job).to.exist;
                expect(job.customer).to.exist;
                expect(job.customer.id).to.not.be.null;
                expect(job.contractor).to.exist;
                expect(job.contractor.id).to.not.be.null;
                expect(job.workSite).to.exist;
                done();
            })
    });
});