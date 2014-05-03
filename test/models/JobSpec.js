/**
 * Created by christophererker on 4/28/14.
 */

var mongoose = require('mongoose'),
    expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    jobs = require(path.join(process.cwd(), 'server', 'models', 'Job'));

describe('Job Model', function () {

    var Job = jobs.Model;

    it('Job model should exist', function(done){

        expect(Job).to.not.be.null;
        done();
    });

    it ('Should return the next page of 10 rows', function(done) {
       Job.find({})
           .limit(10)
           .skip(5)
           .populate('Customer')
           .populate('Contractor')
           .populate('WorkSite')
           .exec(function (err, collection) {
               expect(collection.length).to.be.eq(10);
               done();
           });
    });

    it ('Should return a job with only specified filter', function(done) {
        Job.find({Status: {
                $nin: [ lookUps.jobStatus.created,
                        lookUps.jobStatus.unknown,
                        lookUps.jobStatus.workRejected ]}
            })
            .exec(function(err, coll) {
                for(var i=0; i<coll.length; i++)
                {
                    var success = coll[i].Status !== lookUps.jobStatus.created &&
                        coll[i].Status !== lookUps.jobStatus.unknown &&
                        coll[i].Status !== lookUps.jobStatus.workRejected;

                    expect(success).to.be.true;
                }
                done();
            });
    });

    it('Should aggregate on Status for Dashboard', function(done) {
        var dashBoard = {
            inbox: {},
            jobs: {}
        };
        Job.aggregate(
            {$group: {_id: {status: '$Status'}, count: {$sum: 1}}}
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

    it ('Should return a job with linked Customer and WorkSite', function(done){
        Job.find({})
            .limit(1)
            .populate('Customer')
            .populate('Contractor')
            .populate('WorkSite')
            .exec(function (err, collection) {

                var job = collection[0];
                console.log(job);
                expect(job).to.not.be.null;
                expect(job.Customer).to.not.be.null;
                expect(job.Customer._id).to.not.be.null;
                expect(job.Contractor).to.not.be.null;
                expect(job.Contractor._id).to.not.be.null;
                expect(job.WorkSite).to.not.be.null;
                expect(job.WorkSite._id).to.not.be.null;
                done();
            })
    });
});