//setup Dependencies
var express = require('express');

//Configuration requirements
var path = require('path')
    ,expressServer =  require (path.join(process.cwd(), 'server', 'config', 'express'))
    ,mongooseConf = require (path.join(process.cwd(),'server','config','mongoose'))
    ,passport = require (path.join(process.cwd(),'server','config','passport'))
    ,routes = require (path.join(process.cwd(),'server','config','routes'))
    ,auth = require(path.join(process.cwd(),'server','config','auth'));

//Declaring models
var User = require(path.join(process.cwd(),'server','models','Users')).Model;

//Controllers
var userController  = require(path.join(process.cwd(),'server','controllers','users')),
    jobController = require(path.join(process.cwd(),'server','controllers','jobs')),
    requestsController = require(path.join(process.cwd(),'server','controllers','requests')),
    contractorController = require(path.join(process.cwd(),'server','controllers','contractors')),
    translationController = require(path.join(process.cwd(),'server','controllers','translation'));


// Decorate express with our components
// Marry the app to its running configuration
function main(config) {

    //Create the server
    var server = express.createServer();
    expressServer(server, config);
    mongooseConf(config);


    passport(User);
    routes(server, User, userController, jobController, requestsController, contractorController, auth, translationController);

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
