/**
 * Created by isuarez on 4/15/14.
 */

var path = require('path');
var sharedConfig = require(path.join(process.cwd(), 'karma.conf.js'));

module.exports = function(config) {
    var conf = sharedConfig();

    conf.files = conf.files.concat([
        //extra testing code
        'public/vendor/angular-mocks/angular-mocks.js',

        //mocha stuff
        'public/test/mocha.conf.js',

        //test files
        './public/test/unit/**/*.js'
    ]);

    //Setting the configuration
    config.set(conf);
};