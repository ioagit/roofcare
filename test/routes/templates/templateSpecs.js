/**
 * Created by isuarez on 4/12/14.
 */

var should = require('should');
var expect = require("chai").expect;
var request = require('supertest');
var path = require('path');


var agent;
agent = request.agent('http://localhost:' + 3000);



describe.skip ("Routes Tempaltes ", function() {

    it('Should Return an _tpl file when requested with a template path', function(done) {
        agent
            .get('/templates/views/roofer/dashboard_tpl.html')
            .expect(200,done);

    });

});

