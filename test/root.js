/**
 * Created by isuarez on 4/7/2014.
 */

var path = require('path');

var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));
var init = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'init'));



/* This will happen before any test */

before(function() {

        init.initServer();
//        testData.createTestLocations();
        testData.createDefaultUsers();
    }

)

after(function() {
//    testData.removeAllLocations();
    testData.removeAllUsers();
});
