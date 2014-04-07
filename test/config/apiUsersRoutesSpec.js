var should = require('should');
var expect = require("chai").expect;
var request = require('supertest');
var path = require('path');


var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));
var testUtil = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'util'));


var init = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'init'));

//Global before function. Only runs before any test
before(function() {
        init.initServer();

    }

)

var agent;
agent = request.agent('http://localhost:' + 3000);


describe ("API Users", function() {


    before(function(done) {
        //Create default Users;
        testData.createDefaultUsers(done);
    });

    after(function(done) {
        //Create default Users;
        testData.removeAllUsers(done);

    });



    describe('GET /api/users', function () {

        it('should response unauthorized status for anonymous', function (done) {
            agent
                .get('/api/users')
                .expect(403, done);
        });

        it('should start with signin non admin', testUtil.loginUser(agent, testData.users.contractor));
        it('should response unauthorized status for non admin', function (done) {
            agent
                .get('/api/users')
                .expect(403, done);
        });
        it('should sign the user out', function (done) {
            agent.get('/logout').expect(200, done);

        });

        it('should  signin an admin', testUtil.loginUser(agent, testData.users.admin));
        it('should response with json for admin', function (done) {
            agent
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    done();
                });
        });
        it('should log the user out', function (done) {
            agent
                .get('/logout')
                .expect(200, done);

        });


    });

    describe('POST /api/users', function () {

        var mongoose;
        var User;

        before(function () {
            mongoose = require('mongoose');
            User = mongoose.model('User');
        });


        it('should create a new user',
            testUtil.createUser(agent, testData.users.contractor1)
        );


        it('should throw duplicate user error when trying to save users with same username', function (done) {
            //First lets create the user

            agent
                .post('/api/users')
                .send(testData.users.contractor1)
                .end(onResponse);

            function onResponse(err, res) {
                if (err) {
                    return done(err);
                }
                // this is should.js syntax, very clear
                console.log(res.text)
                res.should.have.status(400);
                res.body.should.have.property('reason');
                expect(res.body.reason).to.contain('Error: Duplicated Username');
                return done();
            }


        })

    });

    xdescribe('PUT /api/users', function () {

        var mongoose;
        var User;

        before(function () {
            mongoose = require('mongoose');
            User = mongoose.model('User');
        });


        it('should create a new user',
            testUtil.createUser(agent, testData.users.contractor1)
        );


        it('should throw duplicate user error when trying to save users with same username', function (done) {
            //First lets create the user

            agent
                .post('/api/users')
                .send(testData.users.contractor1)
                .end(onResponse);

            function onResponse(err, res) {
                if (err) {
                    return done(err);
                }
                // this is should.js syntax, very clear
                console.log(res.text)
                res.should.have.status(400);
                res.body.should.have.property('reason');
                expect(res.body.reason).to.contain('Error: Duplicated Username');
                return done();
            }


        })

    });



} );