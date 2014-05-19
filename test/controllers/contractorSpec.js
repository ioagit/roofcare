/**
 * Created by christophererker on 5/3/14.
 */

var mongoose = require('mongoose'),
    expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
    request = require('supertest'),
    jobs = require(path.join(process.cwd(), 'server', 'models', 'Job')),
    customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')),
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
    User = require(path.join(process.cwd(), 'server', 'models', 'Users')).Model,
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    testUtil = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'util'));

var contractor = null;

var controller = require(path.join(process.cwd(), 'server', 'controllers', 'contractors'));
var agent = request.agent('http://localhost:' + 3000);

describe('Controller - Contractor', function () {

    it('controller should exist', function(){
        expect(controller).to.not.be.null;
    });

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
                    for (var i =0; i < dashBoard.comingUp.length; i++)
                    {
                        var job = dashBoard.comingUp[i];
                        expect(job).to.not.be.null;
                        expect(job.contractor).to.eq(contractor.id);
                    }
                    done();
                });
        });

        it('should logout contractor', testUtil.logOut(agent));

    });
});