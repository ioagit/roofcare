/**
 * Created by isuarez on 4/6/14.
 */

var should = require('should');
var expect = require("chai").expect;
var request = require('supertest');

//Use as a generic callback function
function callback(err, result) {
    if (err)
       console.log(data);

    if (result)
        console.log(result);

}

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
            //console.log(res.text)
            res.status.should.equal(200);
            res.body.should.have.property('success');
            res.body.should.have.property('user');
            return done();
        }
    }

} //login User


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
            res.status.should.equal(200);
            res.body.should.have.property('success');
            res.body.success.should.be.false;
            return done();
        }
    }

} //login Invalid User

function logOut (agent) {

   return function(done) {
       agent
           .get('/logout')
           .expect(200, done);
   }
}

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
            console.log(res.text);
            res.status.should.equal(200);
            res.body.contactInfo.firstName.should.equal(user.contactInfo.firstName);
            res.body.hashed_pwd.should.not.equal(user.password);
            res.body.roles.should.containEql('contractor');
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
            console.log(res.text);
            res.status.should.equal(200);

            res.body.contactInfo.firstName.should.equal(user.contactInfo.firstName);
            res.body.roles.should.be.an.Array.and.have.lengthOf(2);
            res.body.roles.should.containEql('testRole');
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
            console.log(res.text);
            res.status.should.equal(403);
            return done();
        }

    }

}

module.exports = {

    //Generic callback
    callback: callback,
    reqAuthRoute: reqAuthRoute,
    loginUser: loginUser,
    loginInvalidUser: loginInvalidUser,
    logOut: logOut,
    createUser: createUser,
    updateUser: updateUser


}

