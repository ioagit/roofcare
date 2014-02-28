//setup Dependencies
var connect = require('connect')
    , express = require('express')
    , io = require('socket.io')
    , port = (process.env.PORT || 8081)
    , stylus = require('stylus')
    , mongoose = require('mongoose')
    , homeRoute = require('./routes/home.js')
    , customerRoute = require('./routes/customer.js');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//sytlus setup
function compile(str, path) {
    return stylus(str).set('filename', path);
}

//Setup Express
var server = express.createServer();
server.configure(function(){

    //Seting view options
    server.set('views', __dirname + '/server/views');
    server.set('view engine', 'jade');
    server.set('view options', { layout: false });

    //stylus
    server.use(stylus.middleware(
        {src: __dirname + 'public',
         compile: compile
        }
    ));

    server.use(connect.static(__dirname + '/public'));

    server.use(express.logger('dev'));
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
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


//Connecting to MongoDB
mongoose.connect('mongodb://localhost/testdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', function callback() {
    console.log('testdb is now open');
});

//Creating mongoose schemas
var messageSchema = new mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function (err, messageDoc){
    mongoMessage = messageDoc.message;
});

server.listen( port);

//Setup Socket.IO
//var io = io.listen(server);
//io.sockets.on('connection', function(socket){
//  console.log('Client Connected');
//  socket.on('message', function(data){
//    socket.broadcast.emit('server_message',data);
//    socket.emit('server_message',data);
//  });
//  socket.on('disconnect', function(){
//    console.log('Client Disconnected.');
//  });
//});


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////


server.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});
server.get('*', function(req, res) {

        res.render('index.jade', {
        locals : {
            title : 'Index page'
                ,description: 'Page Description'
                ,author: 'IOA'
                ,analyticssiteid: 'XXXXXXX'
                ,mongoMessage: mongoMessage
        }
        }
        );

});

//server.get('/', homeRoute.home);
//server.get('/customer', customerRoute.index);
//server.get('/customer/contact', customerRoute.contact);


//A Route for Creating a 500 Error (Useful to keep around)
//server.get('/500', function(req, res){
//    throw new Error('This is a 500 Error');
//});

//The 404 Route (ALWAYS Keep this as the last route)
//server.get('/*', function(req, res){
//    throw new NotFound;
//});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://0.0.0.0:' + port );
