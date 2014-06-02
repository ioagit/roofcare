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
    testData = require(path.join(process.cwd(), 'server', 'utils', 'shared','test', 'data' )),
    testUtil = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'util'));

var contractor = null;
var contractorId;

describe('Controller - Jobs', function () {

    var controller = require(path.join(process.cwd(), 'server', 'controllers', 'jobs'));
    var agent = request.agent('http://localhost:' + 3000);
    var Job = jobs.Model;
    var contractor = null;

    it('controller should exist', function(done){
        expect(controller).to.not.be.null;
        done();
    });

    describe('Querying', function(){
        before( function(done){
            Contractor.find({username: 'contractor1'}, function(err, found){
                contractorId = found[0].id;
                contractor = found[0].toObject();
                contractor.password = 'password';
                done();
            });
        });

        it('contractor1 should exist', function() {
            expect(contractor).to.not.be.null;
        });

        describe('getJob method', function() {

            it('Should exist', function () {
                var whatIsIt = typeof controller.getJob;
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

                var whatIsIt = typeof controller.getJobs;
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
            });

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
                var whatIsIt = typeof controller.getInboxes;
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
                                    customerName = results[0].customer.contactInfo.lastName;
                                    callback();
                                });
                        },
                        function (callback) {
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
                    .get('/api/contractor/inbox?status=' + lookUps.jobStatus.responsePending)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        var resultObj = JSON.parse(res.text);
                        for (var i = 0; i < resultObj.rows.length; i++) {
                            var job = resultObj.rows[i];
                            expect(job.status).to.be.eq(lookUps.jobStatus.responsePending);
                            expect(job.contractor).to.be.eq(contractorId);
                        }
                        done();
                    });
            });

            it('Should logout contractor', testUtil.logOut(agent));
        });
    });

    describe('Saving', function() {

        describe('createJob method', function() {

            it('Should exist', function () {
                var whatIsIt = typeof controller.createJob;
                expect(whatIsIt).to.be.eq('function');
            });

            it('should return 400 if no contractor is within range', function(done) {

                agent
                    .post('/api/job')
                    .send({
                        orderType: lookUps.orderType.check.name,
                        workSite: testData.locations.AcademyOfArts
                    })
                    .expect(400, done);
            });

            it ('should return 200', function(done) {
                agent
                    .post('/api/job')
                    .send({
                        orderType: lookUps.orderType.check.name,
                        workSite: testData.locations.TheEnclave
                    })
                    .expect(200,done);
            });

            it('should fail to find contractor', function(done) {
                agent
                    .post('/api/job')
                    .send({
                        orderType: lookUps.orderType.check.name,
                        roofType: lookUps.roofType.flat.name,
                        workSite: {
                            street: '1345 West Ave Apt 904',
                            city: 'Miami Beach',
                            zipCode: ' 33139'
                        },
                        notes : { customer: 'Hello World'}
                    })
                    .expect(200)
                    .end(function(err, res){
                        if(err) {
                            done(err);
                        } else {
                            var result = JSON.parse(res.text);
                            console.log(result);
                            done();
                        }
                    });
            });

            it('should return a jobId', function(done){
                agent
                    .post('/api/job')
                    .send({
                        orderType: lookUps.orderType.check.name,
                        workSite: testData.locations.TheEnclave
                    })
                    .end(function(err, res){
                        if(err) {
                            done(err);
                        } else {
                            var result = JSON.parse(res.text);

                            expect(result).to.exist;
                            expect(result.workFlow).to.exist;

                            expect(result.job).to.exist;
                            expect(result.job._id).to.exist;
                            expect(result.job.workSite.coordinates.length).to.eq(2);

                            console.log(result);
                            done();
                        }
                    });
            });
        });

        describe('saveJob method', function() {

            it('Should exist', function () {
                var whatIsIt = typeof controller.saveJob;
                expect(whatIsIt).to.be.eq('function');
            });

            it('should return 406 if job data is missing', function(done){
                agent
                    .put('/api/job')
                    .send({})
                    .expect(406, done);
            });

            it('should return 404 if jobId is not present', function(done) {
                agent
                    .put('/api/job')
                    .send({
                        startDate: (new Date()).toString(),
                        orderType: lookUps.orderType.check.name,
                        workSite: testData.locations.TheEnclave
                    })
                    .expect(404, done);
            });


            describe('With an existing job', function(done) {

                var job = null;

                before( function(done) {
                    Job.find({'invoice.number': 'RC00000201'}, function (err, found) {
                        job = found[0];
                        expect(job).to.not.be.null;
                        expect(job.invoice.number).to.eq('RC00000201');
                        done();
                    });
                });

                it('should save changes to onSiteContact', function(done) {
                    job.onSiteContact.firstName = 'Chris';
                    job.onSiteContact.lastName = 'Smith';
                    agent
                        .put('/api/job')
                        .send(job)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) return done(err);
                            expect(res.body.onSiteContact.firstName).to.eq('Chris');
                            expect(res.body.onSiteContact.lastName).to.eq('Smith');
                            done();
                        });
                });

                it('should save changes to workSite', function(done) {
                    job.status = lookUps.jobStatus.created;

                    job.workSite.street = testData.locations.DolphinMall.street;
                    job.workSite.city = testData.locations.DolphinMall.city;
                    job.workSite.state = testData.locations.DolphinMall.state;
                    job.workSite.zipCode = testData.locations.DolphinMall.zipCode;
                    job.workSite.country = testData.locations.DolphinMall.country;

                    var coordinates = job.workSite.coordinates;

                    agent
                        .put('/api/job')
                        .send(job)
                        .expect(200)
                        .end(function(err,res) {
                            if (err) return done(err);
                            expect(res.body.workSite.coordinates).to.not.eq(coordinates);
                            done();
                        });
                });

                it('should not save changes to workSite', function(done) {
                    job.status = lookUps.jobStatus.responsePending;

                    job.workSite.street = testData.locations.TheEnclave.street;
                    job.workSite.city = testData.locations.TheEnclave.city;
                    job.workSite.state = testData.locations.TheEnclave.state;
                    job.workSite.zipCode = testData.locations.TheEnclave.zipCode;
                    job.workSite.country = testData.locations.TheEnclave.country;
                    var coordinates = job.workSite.coordinates;

                    agent
                        .put('/api/job')
                        .send(job)
                        .expect(200)
                        .end(function(err,res) {
                            if (err) return done(err);
                            expect(res.body.workSite.coordinates[0]).to.eq(coordinates[0]);
                            expect(res.body.workSite.coordinates[1]).to.eq(coordinates[1]);
                            done();
                        });
                });

            });
        });
    });
});