//setup Dependencies
var  express = require('express');



var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


//Getting the config object
var config = require('./server/config/config')[env];

//Setup Express
var server = express.createServer();


require ('./server/config/express')(server, config);

//Mongoose config
require ('./server/config/mongoose')(config);

//Configuring Passport
require ('./server/config/passport')();



//Routes config
require ('./server/config/routes')(server);


server.listen(config.port);

console.log('Listening on http://0.0.0.0:' + config.port );

//Creating mongoose schemas
//var messageSchema = new mongoose.Schema({message: String});
//var Message = mongoose.model('Message', messageSchema);
//var mongoMessage;
//var query;
//query = Message.findOne();
//query.exec(function (err, messageDoc){
//    if (err) {
//        console.log(err);
//        return;
//    }
//    mongoMessage = messageDoc.message;
//});



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
