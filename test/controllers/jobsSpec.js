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
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    testUtil = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'util'));

var contractor = null;

describe('Job Controller', function () {

    var jobsController = require(path.join(process.cwd(), 'server', 'controllers', 'jobs'));
    var agent = request.agent('http://localhost:' + 3000);
    var Job = jobs.Model;

    it('controller should exist', function(done){

        expect(jobsController).to.not.be.null;
        done();
    });


    describe('getJob method', function() {

        it('Should exist', function () {

            var whatIsIt = typeof jobsController.getJob;
            expect(whatIsIt).to.be.eq('function');
        });

        it('Should respond with 404 when id is not found', function (done) {
            agent
                .get('/api/contractor/jobs/123')
                .set('Accept', 'application/json')
                .expect(404, done);
        });
    });

    describe('getJobs method', function() {

        it('Should exist', function (done) {

            var whatIsIt = typeof jobsController.getJobs;
            expect(whatIsIt).to.be.eq('function');
            done();
        });

        it('Should return 200', function (done) {

            agent
                .get('/api/contractor/jobs')
                .expect(200, done);

        });

        it('Should respond with json', function (done) {
            agent
                .get('/api/contractor/jobs')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    var resultObj = JSON.parse(res.text);
                    var len = resultObj.rows.length;
                    expect(len).to.be.at.most(10);
                    expect(resultObj.totalFound).to.be.at.least(len);
                    done();
                });
        });

        it('Should respond with 5 results when limit = 5', function (done) {
            agent
                .get('/api/contractor/jobs?limit=5')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    var resultObj = JSON.parse(res.text);
                    var len = resultObj.rows.length;
                    expect(len).to.eq(5);
                    expect(resultObj.totalFound).to.be.at.least(5);
                    done();
                });
        });

        it('Should filter on customer name', function (done) {

            var results;
            var customerName;

            //customer.Model.find({'contactInfo.lastName': customerName})

            async.series([
                    function (callback) {
                        Job.QueryJobs()
                            .populate('Customer')
                            .populate('WorkSite')
                            .exec(function (err, collection) {
                                results = collection;
                                expect(results).to.not.be.null;
                                callback();
                            });
                    },
                    function (callback) {
                        customerName = results[0].Customer.contactInfo.lastName;
                        agent
                            .get('/api/contractor/jobs?customer=' + customerName)
                            .set('Accept', 'application/json')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) return callback(err);

                                var resultObj = JSON.parse(res.text);

                                expect(resultObj.rows.length).to.be.at.least(1);
                                var obj = resultObj.rows[0];
                                expect(obj).to.not.be.null;
                                expect(obj.Customer).to.not.be.null;
                                expect(obj.Customer.contactInfo.lastName).to.eq(customerName);

                                callback();
                            });
                    }
                ],
                function (err, results) {
                    //Callback when everything is done.
                    if (err || !results) {
                        done(err);
                    }
                    if (results.length) return done();
                });
        })

        it('Should filter on status', function (done) {

            agent
                .get('/api/contractor/jobs?status=' + lookUps.jobStatus.requestAccepted)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    var resultObj = JSON.parse(res.text);
                    for (var i = 0; i < resultObj.rows.length; i++) {
                        var job = resultObj.rows[i];
                        expect(job.Status).to.be.eq(lookUps.jobStatus.requestAccepted);
                    }
                    done();
                });
        });
    });

    describe('getInboxes method', function() {

        before( function(done){
            Contractor.find({username: 'contractor1'}, function(err, found){
                contractor = found[0].toObject();
                contractor.password = 'password';
                done();
            });
        });

        it('Contractor1 should exist', function() {
            expect(contractor).to.not.be.null;
        });

        it('Should exist', function (done) {
            var whatIsIt = typeof jobsController.getInboxes;
            expect(whatIsIt).to.be.eq('function');
            done();
        });

        it('Should return 403 Forbidden because authentication failed', function (done) {
            agent
                .get('/api/contractor/dashboard')
                .expect(403, done);
        });

        it('Should login as contractor', function(done){
            testUtil.loginUser(agent, contractor)(done);
        });

        it('Should return 200', function (done) {
            agent
                .get('/api/contractor/inbox')
                .expect(200, done);
        });

        it('Should respond with json', function (done) {
            agent
                .get('/api/contractor/inbox')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    var resultObj = JSON.parse(res.text);
                    var len = resultObj.rows.length;
                    expect(len).to.be.at.most(10);
                    expect(resultObj.totalFound).to.be.at.least(len);
                    done();
                });
        });

        it('Should respond with 5 results when limit = 5', function (done) {
            agent
                .get('/api/contractor/inbox?limit=5')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    var resultObj = JSON.parse(res.text);
                    var len = resultObj.rows.length;
                    expect(len).to.eq(5);
                    expect(resultObj.totalFound).to.be.at.least(5);
                    done();
                });
        });

        it('Should filter on customer name', function (done) {

            var results;
            var customerName;

            async.series([
                    function (callback) {
                        Job.QueryInbox()
                            .populate('Customer')
                            .populate('WorkSite')
                            .exec(function (err, collection) {
                                results = collection;
                                expect(results).to.not.be.null;
                                callback();
                            });
                    },
                    function (callback) {
                        customerName = results[0].Customer.contactInfo.lastName;
                        agent
                            .get('/api/contractor/inbox?customer=' + customerName)
                            .set('Accept', 'application/json')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) return callback(err);

                                var resultObj = JSON.parse(res.text);

                                expect(resultObj.rows.length).to.be.at.least(1);
                                var obj = resultObj.rows[0];
                                expect(obj).to.not.be.null;
                                expect(obj.Customer).to.not.be.null;
                                expect(obj.Customer.contactInfo.lastName).to.eq(customerName);

                                callback();
                            });
                    }
                ],
                function (err, results) {
                    //Callback when everything is done.
                    if (err || !results) {
                        done(err);
                    }
                    if (results.length) return done();
                });
        })

        it('Should filter on status', function (done) {

            agent
                .get('/api/contractor/inbox?status=' + lookUps.jobStatus.created)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    var resultObj = JSON.parse(res.text);
                    for (var i = 0; i < resultObj.rows.length; i++) {
                        var job = resultObj.rows[i];
                        expect(job.Status).to.be.eq(lookUps.jobStatus.created);
                    }
                    done();
                });
        });

        it('Should logout contractor', testUtil.logOut(agent));
    });
});