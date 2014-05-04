/**
 * Created by isuarez on 4/7/2014.
 */

var path = require('path');

var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));
var seedData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'seed'));

var init = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'init'));
var async = require('async');



/* This will happen before any test */

before(function (done) {

        init.initServer();

        async.series([
            function(callback) { testData.removeAllJobs(callback); },
            function(callback) { testData.removeAllLocations(callback); },
            function(callback) { testData.removeAllUsers(callback); },
            function(callback) { testData.createTestJobs(callback); },
            function(callback) { testData.createTestLocations(callback); },
            function(callback) { testData.createDefaultUsers(callback); },
            function(callback) { seedData.seedOneContractor(200, callback); }
            ],
        //Callback when everything is done.
        function (err, results) {
            if (err || !results) { done(err); }
            if (results.length) return done();
        });
    }
)

after(function (done) {
    done();
});
