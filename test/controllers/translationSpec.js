/**
 * Created by isuarez on 5/28/2014.
 */

var expect = require('chai').expect,
    path = require('path'),
    request = require('supertest');



var controller = require(path.join(process.cwd(), 'server', 'controllers', 'translation'));
var agent = request.agent('http://localhost:' + 3000);

describe('Controller - Translation', function () {

    it('controller should exist', function(){
        expect(controller).to.not.be.null;
    });

    describe('getTranslation method', function() {

        it('Should exist', function () {
            var whatIsIt = typeof controller.getTranslation;
            expect(whatIsIt).to.be.eq('function');
        });

        it('Should respond with json', function (done) {
            agent
                .get('/api/translation')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    var translation = JSON.parse(res.text);
                    expect(translation).to.not.be.null;
                    expect(translation.language).to.not.be.null;
                    done();
                });
        });
    });

});
