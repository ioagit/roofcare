var should = require('should');
var expect = require("chai").expect;
var request = require('supertest');
var path = require('path');

var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));
var testUtil = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'util'));

var agent = request.agent('http://localhost:' + 3000);




describe ("Routes Login Logout", function() {


    describe('Login and Logout', function() {

        it('/login should return fail with an invalid username and password', testUtil.loginInvalidUser(agent, testData.users.invalid));

        it('/login should return fail with an invalid and crazy username and password', testUtil.loginInvalidUser(agent, testData.users.crazy));


        it('/login should return success with a valid username and password', testUtil.loginUser(agent, testData.users.admin));

        it('/login should return success when passing crazy characters', testUtil.loginUser(agent, testData.users.admin));

        it('/logout should log the user out',testUtil.logOut(agent));

        it('should response unauthorized status for non anonymous users', function (done) {
            agent
                .get('/api/users')
                .expect(403, done);
        });
    });



});