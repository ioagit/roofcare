var should = require('should');
var request = require('supertest');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../../server/config/config')[env];
var server = require('../../server')(config);
server.listen(config.port);


describe ("Routes", function() {


    describe('/login', function() {

        it('should return success with a valid username and password', loginUser());

        it('should return fail with an invalid username and password', loginInvalidUser());

    });

    describe('/logout', function(done) {

        it('should start with signin', loginUser());

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
        it('should response unauthorized status for non admin', function(done){
            request(server)
                .get('/api/users')
                .expect(403, done);
        });



    });

    function loginUser() {

        return function(done) {

            var credentials = {
                username: 'verita',
                password: 'verita'
            };

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
                    return done(new Error(err.message));
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