//setup Dependencies
var  express = require('express');

//Configuration requirements
var expressServer =  require ('./server/config/express');
var mongoose = require ('./server/config/mongoose');
var passport = require ('./server/config/passport');
var routes = require ('./server/config/routes');





// Decorate express with our components
// Marry the app to its running configuration
function main(config) {

    //Create the server
    var server = express.createServer();
    expressServer(server, config);
    mongoose(config);
    passport(config);
    routes(server);

    return server;
}

// Expose the app
module.exports = main;

// Start listening if the server has been started directly

if (module === require.main) {

       var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

       //Getting the config object
       var config = require('./server/config/config')[env];

      //Get configured Server
       var server = main(config);

      server.listen(config.port);

      console.log('Listening on http://0.0.0.0:' + config.port );

}

//
//var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
////Getting the config object
//var config = require('./server/config/config')[env];
//
////Setup Express
//var server = express.createServer();
//
//require ('./server/config/express')(server, config);
//
////Mongoose config
//require ('./server/config/mongoose')(config);
//
////Configuring Passport
//require ('./server/config/passport')();
//
////Routes config
//require ('./server/config/routes')(server);
//
//server.listen(config.port);
//
//console.log('Listening on http://0.0.0.0:' + config.port );
