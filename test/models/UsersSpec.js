/**
 * Created by isuarez on 3/31/14.
 */

var mongoose = require('mongoose');
var expect = require('chai').expect;
var path = require('path');

var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));

require(path.join(process.cwd(), 'server', 'models', 'Users'));

describe('User Model', function () {

    var User;

    before(function (done) {
        User = mongoose.model('User');
        done();
    });

    describe('For Admin users', function () {

        var userObj;
        before(function (done) {

            var admin = testData.users.admin;
            expect(admin).to.not.be.null;
            User.findOne({username: admin.username}, function (err, user) {
                userObj = user;
                done();
            })

        });

        it('isAdmin() should return true for admin users', function () {
            expect(userObj).to.not.be.null;
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