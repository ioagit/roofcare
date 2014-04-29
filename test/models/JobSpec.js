/**
 * Created by christophererker on 4/28/14.
 */
var mongoose = require('mongoose');
var expect = require('chai').expect;
var path = require('path');
var async = require('async');
var jobs = require(path.join(process.cwd(), 'server', 'models', 'Job'));

describe('Job Model', function () {

    var Job = jobs.Model;

    it('Job model should exist', function(done){

        expect(Job).to.not.be.null;
        done();
    });

    it('Job find should return 20 jobs', function(done){

        Job.find({})
            .exec(function (err, collection) {
                expect(collection.length).to.eq(20);
                done();
            })
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