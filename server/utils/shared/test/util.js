/**
 * Created by isuarez on 4/6/14.
 */

var should = require('should');
var expect = require("chai").expect;
var request = require('supertest');


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


function loginInvalidUser(agent, user) {

    return function(done) {

        agent
            .post('/login')
            .send(user)
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

function logOut (agent) {

   return function(done) {
       agent
           .get('/logout')
           .expect(200, done);
   }
};

function createUser(agent, user) {

    return function (done) {

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
            res.body.firstName.should.equal(user.firstName);
            res.body.hashed_pwd.should.not.equal(user.password);
            res.body.roles.should.include('contractor');
            return done();
        }

    }

}


function updateUser(agent, user) {

    return function (done) {

        agent
            .put('/api/users')
            .send(user)
            .end(onResponse);

        function onResponse(err, res) {
            if (err) {
                return done(err);
            }
            // this is should.js syntax, very clear
            console.log(res.text)
            res.should.have.status(200);
            res.body.firstName.should.equal(testData.users.modifiedContractor1.firstName);
            res.body.roles.should.include('testRole');
            return done();
        }

    }

}


function reqAuthRoute(agent, data, route,method) {

    return function (done) {

        agent[method](route)
            .send(data)
            .end(onResponse);

        function onResponse(err, res) {
            if (err) {
                return done(err);
            }
            // this is should.js syntax, very clear
            console.log(res.text)
            res.should.have.status(403);
            return done();
        }

    }

}

module.exports = {

    reqAuthRoute: reqAuthRoute,
    loginUser: loginUser,
    loginInvalidUser: loginInvalidUser,
    logOut: logOut,
    createUser: createUser,
    updateUser: updateUser


}

