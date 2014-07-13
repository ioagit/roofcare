/**
 * Created by isuarez on 4/12/14.
 */

var should = require('should'),
    expect = require("chai").expect,
    request = require('supertest'),
    path = require('path'),
    agent = request.agent('http://localhost:' + 3000);

describe ("Routes - Templates ", function() {

    it('Should Return an _tpl file when requested with a template path', function(done) {
        agent
            .get('/templates/views/contractor/dashboard_tpl.html')
            .expect(200,done);

    });

});
