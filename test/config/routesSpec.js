var should = require('should');
var request = require('supertest');


var env = 'test';
var config = require('../../server/config/config')[env];
var server = require('../../server')(config);
server.listen(config.port);

var adminCredentials =  {
    username: 'verita',
    password: 'verita'
};

var contractorCredentials = {
    username: 'rimita',
    password: 'rimita'
};
var userCredentials = {
    username: 'ioaioa',
    password: 'ioaioa'
};

//We want a persistence agent



describe ("Routes", function() {


    describe('/login', function() {

        it('should return success with a valid username and password', loginUser(request(server),adminCredentials));

        it('should return fail with an invalid username and password', loginInvalidUser());

    });

    describe('/logout', function(done) {

        var agent =  request.agent('http://localhost:' + config.port);

        it('should start with signin', loginUser(agent, adminCredentials));

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

        //For persistence
        var agentUsers = request.agent('http://localhost:' + config.port);

        it('should response unauthorized status for anonymous', function(done){
            agentUsers
                .get('/api/users')
                .expect(403, done);
        });

        it('should start with signin non admin', loginUser(agentUsers, contractorCredentials));
        it('should response unauthorized status for non admin', function(done){
            agentUsers
                .get('/api/users')
                .expect(403, done);
        });
        it('should sign the user out', function(done) {
            agentUsers.get('/logout').expect(200, done);

        });

        it('should  signin an admin', loginUser(agentUsers, adminCredentials));
        it('should response with json for admin', function(done){
            agentUsers
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res){
                    if (err) return done(err);

                    done();
                });
        });
        it('should log the user out', function(done) {
            agentUsers
                .get('/logout')
                .expect(200, done);

        });





    });

    function loginUser(agent, credentials) {

        return function(done) {

            agent
                .post('/login')
                .send(credentials)
                .end(onResponse);


            function onResponse(err, res) {
                if (err) {
                    return done(new Error(err.message));
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

            var credentials = {
                username: 'verita',
                password: 'verita1'
            };

            request(server)
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
                res.body.success.should.be.false;
                return done();
            }
        }

    }; //login Invalid User

});