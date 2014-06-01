/**
 * Created by isuarez on 5/28/2014.
 */

var expect = require('chai').expect,
    path = require('path'),
    request = require('supertest');



var controller = require(path.join(process.cwd(), 'server', 'controllers', 'lookups'));
var agent = request.agent('http://localhost:' + 3000);

describe.only('Controller - lookups', function () {

    it('controller should exist', function(){
        expect(controller).to.not.be.null;
    });

    describe('getLookups method', function() {

        it('Should exist', function () {
            var whatIsIt = typeof controller.getLookups;
            expect(whatIsIt).to.be.eq('function');
        });

        it('Should respond with json', function (done) {
            agent
                .get('/api/lookups')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    var obj = JSON.parse(res.text);
                    expect(obj).to.not.be.null;
                    expect(obj.roles).to.not.be.null;
                    done();
                });
        });
    });

});
