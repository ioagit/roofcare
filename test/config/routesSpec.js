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

var routes = require('../../server/config/routes.js')(server, config);


describe ("Routes", function() {


    describe('Auth Routes', function() {

        it('should login a valid username and password', function(done) {

            var user = {
                username: 'verita',
                password: 'verita'
            };

            request(server)
                .post('/login')
                .send(user)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.should.have.status(400);
                    res.body.should.have.property('success');
                    res.body.should.have.property('user');
                    done();
                }
            );

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



});