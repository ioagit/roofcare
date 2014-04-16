/**
 * Created by isuarez on 4/15/14.
 */

var path = require('path');
var sharedConfig = require(path.join(process.cwd(), 'karma.conf.js'));

module.exports = function(config) {
    var conf = sharedConfig();

    conf.files = conf.files.concat([
        //test files
        './public/test/e2e/**/*.js'
    ]);

    conf.proxies = {
        '/': 'http://localhost:3000/'
    };

    conf.urlRoot = '/__karma__/';

    conf.frameworks = ['ng-scenario'];

    config.set(conf);
};