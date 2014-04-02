/**
 * Created by isuarez on 4/2/2014.
 */

module.exports = {
    startApp: function(port) {

        var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

        //Getting the config object
        var config = require('./server/config/config')[env];

        var app = require('../../server')(config);
        var server = app.listen(port);
        return server;
    }
};
