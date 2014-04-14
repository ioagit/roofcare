//setup Dependencies
var  express = require('express');

//Configuration requirements
var path = require('path')
    ,expressServer =  require (path.join(process.cwd(), 'server', 'config', 'express'))
    ,mongooseConf = require (path.join(process.cwd(),'server','config','mongoose'))
    ,passport = require (path.join(process.cwd(),'server','config','passport'))
    ,routes = require (path.join(process.cwd(),'server','config','routes'))
    ,auth = require(path.join(process.cwd(),'server','config','auth'));

//Models
var mongoose = require('mongoose');

//Declaring models
require(path.join(process.cwd(),'server','models','Users'));
var User = mongoose.model('User');

//Controllers
var userController  = require(path.join(process.cwd(),'server','controllers','users'));




// Decorate express with our components
// Marry the app to its running configuration
function main(config) {

    //Create the server
    var server = express.createServer();
    expressServer(server, config);
    mongooseConf(config);


    passport(User);
    routes(server, User, userController, auth);

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
