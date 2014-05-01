/**
 * Created by isuarez on 4/7/2014.
 */

var should = require('should');
var expect = require("chai").expect;
var request = require('supertest');
var path = require('path');

var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));
var testUtil = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'util'));

var agent = request.agent('http://localhost:' + 3000);

var User;


describe ("Routes API Users", function() {

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

        it('should fail to create user when user data is not valid', function(done) {

            agent
                .post('/api/users')
                .send(testData.users.invalid)
                .end(onResponse);

            function onResponse(err, res) {
                expect(err).to.be.null;
                res.should.have.status(400);
                res.body.should.have.property('reason');
                res.body.should.have.property('err');
                res.body.err.should.have.property('errors');

                var errors = res.body.err.errors;
                errors['contactInfo.firstName'].type.should.equal('required');
                errors['contactInfo.lastName'].type.should.equal('user defined');


                expect(res.body.reason).to.contain('ValidationError');
                return done();
            }

        } );



        it('should create a new user', testUtil.createUser(agent, testData.users.contractor1) );


        it('should throw duplicate user error when trying to add users with same username', function (done) {
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


        });

        after(function(done) {
            testData.removeUser(testData.users.contractor1, done);
        }) ;

    });

    describe('PUT /api/users', function () {


       describe('When not logged in', function() {

           it('should  not allowed to modify users without login in',
               testUtil.reqAuthRoute(agent, testData.users.contractor1, '/api/users','put'));

       });

       describe('When logged in and update its own data', function() {


          // Init method for this describe section
           before(function(done) {
               testData.createUser(testData.users.contractor1, done);
           });

           after(function(done) {

               testData.removeUser(testData.users.contractor1, done);

           }) ;

           it('should login the new user as contractor 1', testUtil.loginUser(agent, testData.users.contractor1));

           it('should fail to update contractor 1 when sending data with contractor credentials', function (done) {
            agent
                .put('/api/users')
                .send(testData.users.contractor)
                .expect(403, done);
        });

        it('should update data for contractor 1 when sent with contractor 1 credentials',  testUtil.updateUser(agent, testData.users.modifiedContractor1));

        it('should logout contractor 1', testUtil.logOut(agent));

       })

        describe('When logged as admin and update users data', function() {

            before(function(done) {
                testData.createUser(testData.users.contractor1, done);
            });

            after(function(done) {

                testData.removeUser(testData.users.contractor1, done);

            }) ;

            it('should login as admin', testUtil.loginUser(agent, testData.users.admin));


            it('should update data for contractor 1', testUtil.updateUser(agent, testData.users.modifiedContractor1));

            it('should logout admin', testUtil.logOut(agent));

        })

    });

} );