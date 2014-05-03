/**
 * Created by christophererker on 5/1/14.
 */

var mongoose = require('mongoose'),
    expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
    request = require('supertest'),
    jobs = require(path.join(process.cwd(), 'server', 'models', 'Job')),
    customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups'));

describe('Job Controller', function () {

    var jobsController = require(path.join(process.cwd(), 'server', 'controllers', 'jobs'));
    var agent = request.agent('http://localhost:' + 3000);
    var Job = jobs.Model;

    it('controller should exist', function(done){

        expect(jobsController).to.not.be.null;
        done();
    });

    it('getJobs method should exist', function(done) {

        var whatIsIt = typeof jobsController.getJobs;
        expect(whatIsIt).to.be.eq('function');
        done();
    });

    it('getJobs should return 200', function(done) {

        agent
            .get('/api/contractor/jobs')
            .expect(200, done);

    });

    it('getJobs should respond with json', function (done) {
        agent
            .get('/api/contractor/jobs')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);

                var resultObj = JSON.parse( res.text );
                var len =resultObj.jobs.length;
                expect(len).to.be.at.most(10);
                expect(resultObj.totalFound).to.be.at.least(len);
                done();
            });
    });

    it('getJobs should respond with 5 results when limit = 5', function (done) {
        agent
            .get('/api/contractor/jobs?limit=5')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);

                var resultObj = JSON.parse( res.text );
                var len = resultObj.jobs.length;
                expect(len).to.eq(5);
                expect(resultObj.totalFound).to.be.at.least(5);
                done();
            });
    });

    it('getJobs should filter on customer name', function(done){
        var query;
        var results;
        var customerName;

        //customer.Model.find({'contactInfo.lastName': customerName})

        async.series([
                function(callback) {
                    query = Job.QueryJobs()
                        .populate('Customer')
                        .populate('WorkSite')
                        .exec(function (err, collection) {
                            results = collection;
                            expect(results).to.not.be.null;
                            callback();
                        });
                },
                function(callback) {
                    customerName = results[0].Customer.contactInfo.lastName;
                    console.log(customerName);
                    agent
                        .get('/api/contractor/jobs?customer=' + customerName)
                        .set('Accept', 'application/json')
                        .expect(200)
                        .end(function (err, res) {
                            if (err) return callback(err);

                            var resultObj = JSON.parse( res.text );

                            expect(resultObj.jobs.length).to.be.at.least(1);
                            var obj = resultObj.jobs[0];
                            expect(obj).to.not.be.null;
                            expect(obj.Customer).to.not.be.null;
                            expect(obj.Customer.contactInfo.lastName).to.eq(customerName);

                            callback();
                        });
                }
            ],
            //Callback when everything is done.
            function (err, results) {
                if (err || !results) { done(err); }
                if (results.length) return done();
            });
    })

});