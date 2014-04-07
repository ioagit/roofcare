/**
 * Created by isuarez on 3/6/14.
 */

var mongoose  = require('mongoose')

module.exports = function(config) {

    //Connecting to MongoDB
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.on('open', function callback() {
        console.log('testdb is now open');
    });


}
