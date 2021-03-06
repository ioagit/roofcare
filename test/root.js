/**
 * Created by isuarez on 4/7/2014.
 */

var path = require('path'),
    testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data')),
    seedData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'seed')),
    init = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'init')),
    async = require('async');

/* This will happen before any test */

before(function (done) {

        init.initServer();

        async.series([
            function(callback) { testData.removeAllJobs(callback); },
            function(callback) { testData.removeAllUsers(callback); },
            function(callback) { testData.createDefaultUsers(callback); },
            function(callback) { seedData.seedOneContractor(10, callback); }
            ],
        //Callback when everything is done.
        function (err, results) {
            if (err || !results) { done(err); }
            if (results.length) return done();
        });
    }
);