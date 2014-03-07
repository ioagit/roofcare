/**
 * Created by isuarez on 3/6/14.
 */

var mongoose  = require('mongoose');

module.exports = function(config) {

    //Connecting to MongoDB
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.on('open', function callback() {
        console.log('testdb is now open');
    });

    var userSchema = new mongoose.Schema({firstName: String, lastName: String, username: String});
    var User =  mongoose.model('User', userSchema);


    function handlerError(err, obj) {
        if (err) {
            console.log(err);
        }
    }

    //Defining a handleCreation
    function handleDocumentCreation(err, obj) {
        if (err) {
           handlerError();
           return;
        }

        console.log(JSON.stringify(obj));
    }

    User.find({}).exec(function(err, collection) {

            if (err) {
                handlerError();
                return;
            }

         if (collection.length === 0) {
             User.create({firstName:'Verita', lastName: 'Suarez', username:'verita' }, handleDocumentCreation);
             User.create({firstName:'Rima', lastName: 'Gerhard', username:'rimita' }, handleDocumentCreation);
             User.create({firstName:'Ioa', lastName: 'Suarez', username:'ioaioa' }, handleDocumentCreation);

         }



        }
    )

}
