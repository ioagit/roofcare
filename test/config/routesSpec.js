var should = require('should');
var request = require('supertest');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
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
};;


describe ("Routes", function() {


    describe('/login', function() {



        it('should return success with a valid username and password', loginUser(adminCredentials));

        it('should return fail with an invalid username and password', loginInvalidUser());

    });

    describe('/logout', function(done) {



        it('should start with signin', loginUser(adminCredentials));

        it('should sign the user out', function(done) {
            request(server)
                .get('/logout')
                .expect(200, done);

        });
        it('should response unauthorized status for non anonymous users', function(done){
            request(server)
                .get('/api/users')
                .expect(403, done);
        });


    });


    describe('GET /api/users', function(){

        it('should response unauthorized status for anonymous', function(done){
            request(server)
                .get('/api/users')
                .expect(403, done);
        });

        it('should start with signin non admin', loginUser(contractorCredentials));
        it('should response unauthorized status for non admin', function(done){
            request(server)
                .get('/api/users')
                .expect(403, done);
        });
        it('should sign the user out', function(done) {
            request(server)
                .get('/logout')
                .expect(200, done);

        });

        it('should  signin an admin', loginUser(adminCredentials));
        xit('should response with json for admin', function(done){
            request(server)
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res){
                    if (err) return done(err);

                    done();
                });
        });
        it('should log the user out', function(done) {
            request(server)
                .get('/logout')
                .expect(200, done);

        });





    });

    function loginUser(credentials) {

        return function(done) {

            request(server)
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