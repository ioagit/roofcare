var should = require('should');
var request = require('supertest');
var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Getting the config object
var config = require('../../server/config/config')[env];

//Setup Express
var server = express.createServer();
require ('../../server/config/express')(server, config);

//Mongoose config
require ('../../server/config/mongoose')(config);


//Configuring Passport
require ('../../server/config/passport')();

var routes = require('../../server/config/routes.js')(server, config);


describe ("Routes", function() {


    describe('/login', function() {

        it('should return success with a valid username and password', function(done) {

            var user = {
                username: 'verita',
                password: 'verita'
            };

            loginUser(user, done);

        });

        it('should return fail with an invalid username and password', function(done) {

            var invalid = {
                username: 'verita',
                password: 'verita1'
            };

            request(server)
                .post('/login')
                .send(invalid)
                .end(onResponse);


            function onResponse(err, res) {
                if (err) {
                    done(new Error(err.message));
                }
                res.should.have.status(200);
                res.body.should.have.property('success');
                res.body.success.should.be.false;
                done();
            }

        });

    });



    describe('GET /api/users', function(){
        it('should response unauthorized status for non admin', function(done){
            request(server)
                .get('/api/users')
                .expect(403, done);
        });

//         it('should respond with json for admin users', function(done){
//
//                //First we need to login an admin user
//
//                request(server)
//                    .get('/api/users')
//                    .set('Accept', 'application/json')
//                    .expect('Content-Type', /json/)
//                    .expect(200, done);
//          });



    });




    function loginUser(credentials, done) {

            request(server)
                .post('/login')
                .send(credentials)
                .end(onResponse);


            function onResponse(err, res) {
                if (err) {
                    done(new Error(err.message));
                }
                // this is should.js syntax, very clear
                console.log(res.text)
                res.should.have.status(200);
                res.body.should.have.property('success');
                res.body.should.have.property('user');
                done();
            }


     }; //login User

});