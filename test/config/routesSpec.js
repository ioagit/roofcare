var should = require('should');
var expect = require("chai").expect;
var request = require('supertest');
var path = require('path');

var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));
var testUtil = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'util'));

var agent
agent = request.agent('http://localhost:' + 3000);




describe ("Routes", function() {

    before(function(done) {
        //Create default Users;
        testData.createDefaultUsers(done);
    });

    after(function(done) {
        //Create default Users;
        testData.removeAllUsers(done);
    });



    describe('/Auth Routes', function() {

        it('/login should return fail with an invalid username and password', testUtil.loginInvalidUser(agent, testData.users.invalid));

        it('/login should return fail with an invalid and crazy username and password', testUtil.loginInvalidUser(agent, testData.users.crazy));


        it('/login should return success with a valid username and password', testUtil.loginUser(agent, testData.users.admin));

        it('/login should return success when passing crazy characters', testUtil.loginUser(agent, testData.users.admin));

        it('/logout should log the user out', function (done) {
            agent
                .get('/logout')
                .expect(200, done);


        });

        it('should response unauthorized status for non anonymous users', function (done) {
            agent
                .get('/api/users')
                .expect(403, done);
        });
    });



});