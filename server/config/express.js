/**
 * Created by isuarez on 3/6/14.
 */
//sytlus setup

var  connect = require('connect')
    ,express = require('express')
    ,passport = require('passport')
    ,stylus = require('stylus');

module.exports = function (server, config) {


function compile(str, path) {
    return stylus(str).set('filename', path);
}

//Setup Express
server.configure(function(){

    //Seting view options
    server.set('views', config.rootPath + '/server/views');
    server.set('view engine', 'jade');
    server.set('view options', { layout: false });

    //Render html with no parsing
    server.register('.html', {
        compile: function(string, options){
            return function(locals){
                return string;
            };
        }
    });

    //Pretty html for dev
    server.configure('development', function () { server.locals.pretty = true; });

    //stylus
    server.use(stylus.middleware(
        {src: config.rootPath + 'public',
            compile: compile
        }
    ));

    server.use(connect.static(config.rootPath + '/public'));

    server.use(express.logger('dev'));
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(server.router);
});

//setup the errors
server.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade', { locals: {
            title : '404 - Not Found'
            ,description: ''
            ,author: ''
            ,analyticssiteid: 'XXXXXXX'
        },status: 404 });
    } else {
        res.render('500.jade', { locals: {
            title : 'The Server Encountered an Error'
            ,description: ''
            ,author: ''
            ,analyticssiteid: 'XXXXXXX'
            ,error: err
        },status: 500 });
    }
});

};
function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
