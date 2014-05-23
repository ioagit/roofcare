/**
 * Created by Christopher Erker on 5/19/14.
 */

var mongoose = require('mongoose'),
    expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
    request = require('supertest'),
    jobs = require(path.join(process.cwd(), 'server', 'models', 'Job')),
    customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')),
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));

describe('Controller - Requests', function () {

    var controller = require(path.join(process.cwd(), 'server', 'controllers', 'requests'));
    var agent = request.agent('http://localhost:' + 3000);

    it('controller should exist', function(done){
        expect(controller).to.not.be.null;
        done();
    });

    describe('saveRequest method', function() {

        it('Should exist', function () {
            var whatIsIt = typeof controller.saveRequest;
            expect(whatIsIt).to.be.eq('function');
        });
    });

    describe('createRequest method', function() {

        it('Should exist', function () {
            var whatIsIt = typeof controller.createRequest;
            expect(whatIsIt).to.be.eq('function');
        });

        it('should fail if no contractor is within range', function(done) {

            agent
                .post('/api/request')
                .send({
                    startDate: (new Date()).toString(),
                    orderType: lookUps.orderType.check.name,
                    workSite: testData.locations.AcademyOfArts
                })
                .expect(400, done);

        });

        it ('create request should return 200', function(done) {

            var data = {
                startDate: (new Date()).toString(),
                orderType: lookUps.orderType.check.name,
                workSite: testData.locations.TheEnclave
            };

            agent
                .post('/api/request')
                .send(data)
                .expect(200)
                .end(function(err, res){
                    if(err) {
                        done(err);
                    } else {
                        console.log(res.text);
                        done();
                    }
                });
        });
    });

});