/**
 * Created by isuarez on 5/28/2014.
 */

var path = require('path'),
    translation = require(path.join(process.cwd(), 'server', 'translation', 'de-de'));

exports.getTranslation = function() {

    return function (req, res) {
        res.send(translation);
    }
};
