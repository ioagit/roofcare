/**
 * Created by christophererker on 6/16/14.
 */

'use strict';

var expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
    mailer = require(path.join(process.cwd(), 'server', 'utils','mailer' )),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    jobs = require(path.join(process.cwd(), 'server', 'models', 'Job'));


describe('Module - Mailer', function () {

    var Job = jobs.Model;

    it('Prerequisites should exist', function(done){

        expect(mailer).to.not.be.null;
        expect(lookUps).to.not.be.null;
        expect(Job).to.not.be.null;
        done();
    });

    describe.skip('#sendOne()', function () {

        it('should fail to find non-existent template', function (done) {
            var locals = {
                email: 'one@example.com',
                subject: 'Password reset',
                name: 'Forgetful User',
                resetUrl: 'http;//localhost:3000/password_rest/000000000001|afdaevdae353'
            };
            mailer.sendOne('missing_template_name', locals, function(err) {
                expect(err).to.not.be.null;
                done();
            });
        });

        it('should render the password reset templates correctly', function (done) {
            var locals = {
                email: 'one@example.com',
                subject: 'Password reset',
                name: 'Forgetful User',
                resetUrl: 'http;//localhost:3000/password_rest/000000000001|afdaevdae353'
            };
            mailer.sendOne('test', locals, function (err, responseStatus, html, text) {
                expect(err).to.be.null;
                expect(responseStatus).to.include("OK");
                expect(text).to.include("Please follow this link to reset your password " + locals.resetUrl);
                expect(html).to.include("Please follow this link to reset your password <a href=\"" + locals.resetUrl + "\">" + locals.resetUrl + "</a>");
                done();
            });
        });

        it('should render a responsePending Job template correctly', function(done) {
            Job.find( { })
                .sort('startDate')
                .limit(1)

                .exec(function (err, collection) {
                    expect(err).to.be.null;
                    expect(collection).to.not.be.null;
                    expect(collection.length).to.eq(1);
                    var job = collection[0];

                    var locals = {
                        email: 'one@example.com',
                        subject: 'welcome',
                        name: 'Roofcare',
                        job: job
                    };
                    mailer.sendOne('responsePending', locals, function (err, responseStatus, html, text) {
                        expect(err).to.be.null;
                        expect(html).to.include(job.customer.fullProperName);
                        console.log(html);
                        done();
                    });
                });

        });

    });

});
