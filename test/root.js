/**
 * Created by isuarez on 4/7/2014.
 */

var path = require('path');

var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));
var init = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'init'));



/* This will happen before any test */

before(function(done) {

        init.initServer();
        testData.createTestLocations(done);
        testData.createDefaultUsers(done);
    }

)

after(function(done) {
    testData.removeAllLocations(done);
    testData.removeAllUsers(done);
});
