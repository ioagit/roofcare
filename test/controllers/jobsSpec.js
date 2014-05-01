/**
 * Created by christophererker on 5/1/14.
 */

var mongoose = require('mongoose');
var expect = require('chai').expect;
var path = require('path');
var async = require('async');
var request = require('supertest');

describe('Jobs Controller', function () {

    var jobsController = require(path.join(process.cwd(), 'server', 'controllers', 'jobs'));
    var agent = request.agent('http://localhost:' + 3000);

    it('Jobs controller exists', function(done){

        expect(jobsController).to.not.be.null;
        done();
    });

    it ('Jobs controller has getJobs method', function(done) {

        var whatIsIt = typeof jobsController.getJobs;
        expect(whatIsIt).to.be.eq('function');
        done();
    });

    it('getJobs should return 200', function(done) {

        agent
            .get('/api/contractor/jobs')
            .expect(200, done);

    });

    it('should response with json for getJobs', function (done) {
        agent
            .get('/api/contractor/jobs')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
//console.log(res);
                done();
            });
    });
});
