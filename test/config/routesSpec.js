var should = require('should');
var superagent = require('superagent');
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

server.listen(config.port);


describe ("Routes", function() {

    describe('/login', function() {

        describe('with good credentials', function() {

            var admin = {
                username: 'verita',
                password: 'verita'
            };

            var agent = superagent.agent();

            it('should create a user session', loginUser(agent, admin));

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



    function loginUser(agent, credentials) {

        return function (done) {
            agent
                .post('http://localhost:3000/login')
                .send(credentials)
                .end(onResponse);

            function onResponse(err, res) {
                res.should.have.status(200);
                res.body.should.have.property('success');
                res.body.should.have.property('user');
                return done();
            }
        };
    };

});