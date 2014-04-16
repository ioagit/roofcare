/**
 * Created by isuarez on 4/15/14.
 */

var path = require('path');
var sharedConfig = require(path.join(process.cwd(), 'karma.conf.js'));

module.exports = function(config) {
    var conf = sharedConfig();

    conf.files = conf.files.concat([
        //extra testing code
        'node_modules/ng-midway-tester/src/ngMidwayTester.js',

        //mocha stuff
        'public/test/mocha.conf.js',

        //test files
        'public/test/midway/appSpec.js',
        'public/test/midway/controllers/controllersSpec.js',
        'public/test/midway/filters/filtersSpec.js',
        'public/test/midway/directives/directivesSpec.js',
        'public/test/midway/requestsSpec.js',
        'public/test/midway/routesSpec.js',
        'public/test/midway/**/*.js'
    ]);

    conf.proxies = {
        '/': 'http://localhost:3000/'
    };

    config.set(conf);
};
