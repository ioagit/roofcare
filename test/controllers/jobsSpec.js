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
    testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data')),
    testUtil = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'util'));

var contractor = null;
var contractorId;

describe('Job Controller', function () {

    var jobsController = require(path.join(process.cwd(), 'server', 'controllers', 'jobs'));
    var agent = request.agent('http://localhost:' + 3000);
    var Job = jobs.Model;
    var contractor = null;

    before( function(done){
        Contractor.find({username: 'contractor1'}, function(err, found){
            contractorId = found[0].id;
            contractor = found[0].toObject();
            contractor.password = 'password';
            done();
        });
    });

    it('controller should exist', function(done){
        expect(jobsController).to.not.be.null;
        done();
    });

    it('contractor1 should exist', function() {
        expect(contractor).to.not.be.null;
    });

    describe('saveRequest method', function() {

        it('Should exist', function () {
            var whatIsIt = typeof jobsController.saveRequest;
            expect(whatIsIt).to.be.eq('function');
        });
    });

    describe('createRequest method', function() {

        it('Should exist', function () {
            var whatIsIt = typeof jobsController.createRequest;
            expect(whatIsIt).to.be.eq('function');
        });

        it('create request should fail if no contractor is within range', function(done) {
            agent
                .post('/api/request')
                .send({
                    orderType: lookUps.orderType.check.name,
                    workSite: testData.locations.OceanDrive
                })
                .expect(400,done);
        });

        describe('Update contractor address', function() {
            var contractorAddress;

            before(function(done){
                Contractor.findOne({username: 'contractor1'}, function(err, c){
                    contractorAddress = c.address;
                    c.address =  testData.locations.Sonoma;
                    c.save(done);
                });
            });

            after(function(done) {
                Contractor.findOne({username: 'contractor1'}, function(err, c){
                    c.address =  contractorAddress;
                    c.save(done);
                });
            });

            it ('create request should return 200', function(done) {

                var data = {
                    startDate: new Date(),
                    orderType: lookUps.orderType.check.name,
                    workSite: testData.locations.TheEnclave
                };

                agent
                    .post('/api/request')
                    .send(data)
                    .expect(200)
                    .end(function(err, res){
                        if(err) {
                            done(err);
                        } else {
                            console.log(res.text);
                            done();
                        }
                    });
            });

        })

    });

    describe('getJob method', function() {

        it('Should exist', function () {
            var whatIsIt = typeof jobsController.getJob;
            expect(whatIsIt).to.be.eq('function');
        });

        it('Should return 403 Forbidden because authentication failed', function (done) {
            agent
                .get('/api/contractor/jobs')
                .expect(403, done);
        });

        it('Should login as contractor', function(done){
            testUtil.loginUser(agent, contractor)(done);
        });

        it('Should respond with 404 when id is not found', function (done) {
            agent
                .get('/api/contractor/jobs/123')
                .set('Accept', 'application/json')
                .expect(404, done);
        });

        it('Should return 200', function (done) {
            agent
                .get('/api/contractor/jobs')
                .expect(200, done);
        });

        it('Should logout contractor', testUtil.logOut(agent));
    });

    describe('getJobs method', function() {

        it('Should exist', function (done) {

            var whatIsIt = typeof jobsController.getJobs;
            expect(whatIsIt).to.be.eq('function');
            done();
        });

        it('Should login as contractor', function(done){
            testUtil.loginUser(agent, contractor)(done);
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

            async.series([
                    function (callback) {
                        Job.QueryJobs(contractorId)
                            .populate('customer')
                            .exec(function (err, collection) {
                                results = collection;
                                expect(results).to.not.be.null;
                                callback();
                            });
                    },
                    function (callback) {
                        customerName = results[0].customer.contactInfo.lastName;
                        agent
                            .get('/api/contractor/jobs?customer=' + customerName)
                            .set('Accept', 'application/json')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) return callback(err);

                                var resultObj = JSON.parse(res.text);

                                expect(resultObj.rows.length).to.be.at.least(1);
                                for (var i = 0; i < resultObj.rows.length; i++) {
                                    var job = resultObj.rows[i];
                                    expect(job.customer).to.not.be.null;
                                    expect(job.customer.contactInfo.lastName).to.eq(customerName);
                                    expect(job.contractor).to.be.eq(contractorId);
                                }

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
                        expect(job.status).to.be.eq(lookUps.jobStatus.requestAccepted);
                        expect(job.contractor).to.be.eq(contractorId);
                    }
                    done();
                });
        });

        it('Should logout contractor', testUtil.logOut(agent));
    });

    describe('getInboxes method', function() {

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
                        Job.QueryInbox(contractorId)
                            .populate('customer')
                            .exec(function (err, collection) {
                                results = collection;
                                expect(results).to.not.be.null;
                                callback();
                            });
                    },
                    function (callback) {
                        customerName = results[0].customer.contactInfo.lastName;
                        agent
                            .get('/api/contractor/inbox?customer=' + customerName)
                            .set('Accept', 'application/json')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) return callback(err);

                                var resultObj = JSON.parse(res.text);

                                expect(resultObj.rows.length).to.be.at.least(1);
                                for (var i = 0; i < resultObj.rows.length; i++) {
                                    var job = resultObj.rows[i];
                                    expect(job.customer).to.not.be.null;
                                    expect(job.customer.contactInfo.lastName).to.eq(customerName);
                                    expect(job.contractor).to.be.eq(contractorId);
                                }
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
                        expect(job.status).to.be.eq(lookUps.jobStatus.created);
                        expect(job.contractor).to.be.eq(contractorId);
                    }
                    done();
                });
        });

        it('Should logout contractor', testUtil.logOut(agent));
    });
});