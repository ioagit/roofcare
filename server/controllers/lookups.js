/**
 * Created by isuarez on 5/28/2014.
 */

var path = require('path'),
    lookups = require(path.join(process.cwd(), 'server', 'models', 'lookups'));

exports.getLookups = function() {

    return function (req, res) {
        res.send(lookups);
    }
};
