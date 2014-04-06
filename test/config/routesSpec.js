var should = require('should');
var expect = require("chai").expect;
var request = require('supertest');
var path = require('path');
var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));


var env = 'test';
var config = require('../../server/config/config')[env];
var server = require('../../server')(config);
server.listen(config.port);

var agent;
agent = request.agent('http://localhost:' + config.port);


describe ("Routes", function() {




    describe('/login', function() {

        it('should return success with a valid username and password', loginUser(request(server),testData.credentials.admin));

        it('should return fail with an invalid username and password', loginInvalidUser());

    });

    describe('/logout', function(done) {

        it('should start with signin', loginUser(agent, testData.credentials.admin));

        it('should sign the user out', function(done) {
            agent
                .get('/logout')
                .expect(200, done);

        });
        it('should response unauthorized status for non anonymous users', function(done){
            agent
                .get('/api/users')
                .expect(403, done);
        });


    });


    describe('GET /api/users', function(){





        it('should response unauthorized status for anonymous', function(done){
            agent
                .get('/api/users')
                .expect(403, done);
        });

        it('should start with signin non admin', loginUser(agent, testData.credentials.contractor));
        it('should response unauthorized status for non admin', function(done){
            agent
                .get('/api/users')
                .expect(403, done);
        });
        it('should sign the user out', function(done) {
            agent.get('/logout').expect(200, done);

        });

        it('should  signin an admin', loginUser(agent, testData.credentials.admin));
        it('should response with json for admin', function(done){
            agent
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res){
                    if (err) return done(err);

                    done();
                });
        });
        it('should log the user out', function(done) {
            agent
                .get('/logout')
                .expect(200, done);

        });





    });

    describe('POST /api/users', function() {

        var mongoose;
        var User;

        before(function () {
            mongoose = require('mongoose');
            User = mongoose.model('User');
        });

        after(function (done) {

            User.remove({username: 'testcontractorname'}, done);

        });


        it('should create a new user',
            createUser(agent, testData.users.contractor)
        );

        it('should throw duplicate user error when trying to save users with same username', function(done) {
           //First lets create the user

            agent
                .post('/api/users')
                .send(testData.users.contractor)
                .end(onResponse);

            function onResponse(err, res) {
                if (err) {
                    return done(err);
                }
                // this is should.js syntax, very clear
                console.log(res.text)
                res.should.have.status(400);
                res.body.should.have.property('reason');
                expect(res.body.reason).to.contain('Duplicated Username');
                return done();
            }


        })

    });

    function createUser(agent, user) {

        return function(done) {

            agent
                .post('/api/users')
                .send(user)
                .end(onResponse);

            function onResponse(err, res) {
                if (err) {
                    return done(err);
                }
                // this is should.js syntax, very clear
                console.log(res.text)
                res.should.have.status(200);
                res.body.firstName.should.equal('testContractorFirstName');
                res.body.hashed_pwd.should.not.equal(testData.users.contractor.password);
                res.body.roles.should.include('contractor');
                return done();
            }

        }

    }


    //Helper function for login Users
    function loginUser(agent, credentials) {

        return function(done) {

            agent
                .post('/login')
                .send(credentials)
                .end(onResponse);


            function onResponse(err, res) {
                if (err) {
                    return done(err);
                }
                // this is should.js syntax, very clear
                console.log(res.text)
                res.should.have.status(200);
                res.body.should.have.property('success');
                res.body.should.have.property('user');
                return done();
            }
        }

     }; //login User


    function loginInvalidUser() {

        return function(done) {

            request(server)
                .post('/login')
                .send(testData.credentials.invalid)
                .end(onResponse);


            function onResponse(err, res) {
                if (err) {
                    return done(err);
                }
                // this is should.js syntax, very clear
                console.log(res.text)
                res.should.have.status(200);
                res.body.should.have.property('success');
                res.body.success.should.be.false;
                return done();
            }
        }

    }; //login Invalid User

});