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
    testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data')),
    testUtil = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'util'));

var contractor = null;

describe('Contractor Controller', function () {


    var controller = require(path.join(process.cwd(), 'server', 'controllers', 'contractors'));
    var agent = request.agent('http://localhost:' + 3000);

    it('controller should exist', function(done){

        expect(controller).to.not.be.null;
        done();
    });

    before( function(done){
        Contractor.find({username: 'contractor1'}, function(err, found){
            contractor = found[0].toObject();
            done();
        });
    });

    it('Contractor1 should exist', function() {
        expect(contractor).to.not.be.null;
    });

    describe('getDashboard method', function() {

        it('Should exist', function (done) {

            var whatIsIt = typeof controller.getDashboard;
            expect(whatIsIt).to.be.eq('function');
            done();
        });

        it('Should return 403 Forbidden because authentication failed', function (done) {

            agent
                .get('/api/contractor/dashboard')
                .expect(403, done);

        });

//        it('should login as admin', testUtil.loginUser(agent, testData.users.admin));
        it('should login as contractor', function(done){
            //testUtil.loginUser(agent, contractor)(done);
            testUtil.loginUser(agent, testData.users.admin)(done);
            //done();
        });

//        it ('should login as contractor', function(done) {
//
//            agent
//                .post('/login')
//                .send(contractor)
//                .end(onResponse);
//
//
//            function onResponse(err, res) {
//                if (err) {
//                    return done(err);
//                }
//                // this is should.js syntax, very clear
//                console.log(res.text)
//                res.should.have.status(200);
//                res.body.should.have.property('success');
//                res.body.should.have.property('user');
//                return done();
//            }
//        });

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
                    //console.log(dashBoard);
                    expect(dashBoard).to.not.be.null;
                    done();
                });
        });

        //it('should logout admin', testUtil.logOut(agent));
        it('should logout contractor', testUtil.logOut(agent));

    });
});