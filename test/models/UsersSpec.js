/**
 * Created by isuarez on 3/31/14.
 */

var expect = require('chai').expect;
var assert= require('chai').assert;
var path = require('path');

var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));
var users = require(path.join(process.cwd(), 'server', 'models', 'Users'));

describe('User Model', function () {

    var User = users.Model;


    describe('For Admin users', function () {

        var userObj;
        before(function (done) {

            var admin = testData.users.admin;
            expect(admin).to.not.be.null;
            User.findOne({username: admin.username}, function (err, user) {
                userObj = user;
                expect(userObj).to.not.be.null;
                done();
            })

        });

        it('isAdmin() should return true for admin users', function () {
            expect(userObj.hasRole('admin')).to.be.true;
            expect(userObj.isAdmin()).to.be.true;
        });

        it('isContractor() should return false for admin users', function () {
            expect(userObj.isContractor()).to.be.false;
        });

    });


    describe('For Contractors users', function () {

        var userObj;
        before(function (done) {

            User.findOne({username: testData.users.contractor.username}, function (err, user) {
                expect(err).to.be.null;
                assert(user !== null, 'user is null');

                userObj = user;
                done();
            })

        });


        it('isAdmin() should return false for contractor users', function () {
            expect(userObj.hasRole('admin')).to.be.false;
            expect(userObj.isAdmin()).to.be.false;
        });

        it('isAdmin() should return false for contractor users', function () {
            expect(userObj.isAdmin()).to.be.false;
        });

    });

    describe('For Regular users', function () {

        var userObj;

        before(function (done) {

            User.findOne({username: testData.users.user.username}, function (err, user) {
                expect(err).to.be.null;
                userObj = user;
                done();
            })

        });

        it('isUser() should return true for admin users', function () {
            expect(userObj.isUser()).to.be.true;
        });

        it('isAdmin() should return false for regular users', function () {
            expect(userObj.isAdmin()).to.be.false;
        });

    });
});