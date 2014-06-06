/**
 * Created by christopher erker on 5/3/14.
 */

var mongoose = require('mongoose'),
    expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
    request = require('supertest'),
    jobs = require(path.join(process.cwd(), 'server', 'models', 'Job')),
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
    User = require(path.join(process.cwd(), 'server', 'models', 'Users')).Model,
    testUtil = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'util')),
    controller = require(path.join(process.cwd(), 'server', 'controllers', 'contractors')),
    agent = request.agent('http://localhost:' + 3000);

var contractor = null;
var contractorId = null;

describe('Controller - Contractor', function () {

    it('controller should exist', function(){
        expect(controller).to.not.be.null;
    });

    before( function(done){
        Contractor.find({username: 'contractor1'}, function(err, found){
            contractor = found[0].toObject();
            contractorId = found[0].id;
            contractor.password = 'password';
            done();
        });
    });

    it('Contractor1 should exist', function() {
        expect(contractor).to.not.be.null;
    });

    describe('getDashboard method', function() {

        it('Should exist', function () {
            var whatIsIt = typeof controller.getDashboard;
            expect(whatIsIt).to.be.eq('function');

        });

        it('Should return 403 Forbidden because authentication failed', function (done) {
            agent
                .get('/api/contractor/dashboard')
                .expect(403, done);
        });

        it('should login as contractor', function(done){
            testUtil.loginUser(agent, contractor)(done);
        });

        it('Should return 200', function (done) {
            agent
                .get('/api/contractor/dashboard')
                .expect(200, done);
        });

        it('Should respond with json', function (done) {
            agent
                .get('/api/contractor/dashboard')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    var dashBoard = JSON.parse(res.text);
                    expect(dashBoard).to.not.be.null;
                    expect(dashBoard.inbox).to.not.be.null;
                    expect(dashBoard.jobs).to.not.be.null;
                    expect(dashBoard.comingUp.length).to.be.greaterThan(0);
                    expect(dashBoard.inbox.nextJob).to.not.be.null;
                    expect(dashBoard.inbox.request).to.be.greaterThan(0);
                    expect(dashBoard.inbox.total).to.be.greaterThan(0);
                    expect(dashBoard.jobs.completed).to.be.greaterThan(0);
                    expect(dashBoard.jobs.started).to.be.greaterThan(0);
                    expect(dashBoard.jobs.rejected).to.be.greaterThan(0);

                    for (var i =0; i < dashBoard.comingUp.length; i++)
                    {
                        var job = dashBoard.comingUp[i];
                        expect(job).to.not.be.null;
                        expect(job.contractor).to.eq(contractorId);
                    }
                    done();
                });
        });

        it('should logout contractor', testUtil.logOut(agent));
    });
});