/**
 * Created by isuarez on 4/7/2014.
 */

var path = require('path');

var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));
var init = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'init'));
var async = require('async');



/* This will happen before any test */

before(function (done) {

        init.initServer();

        async.series([
            function(callback){
                testData.removeAllUsers(callback);
            },
            function(callback) {
                testData.createDefaultUsers(callback);
            }

        ],
        //Callback when everything is done.
        function (err, results) {
            if (err || !results) {
                done(err);
            }
            if (results.length) return done();
        });

//        testData.createTestLocations();

    }
)

after(function (done) {
//    testData.removeAllLocations();
    testData.removeAllUsers(done);
});
