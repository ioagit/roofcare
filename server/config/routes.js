/**
 * Created by isuarez on 3/6/14.
 */
var auth = require('./auth')
    ,users = require('../controllers/users')
    ,mongoose = require('mongoose')
    ,User = mongoose.model('User');


module.exports =  function(server) {

    server.get('/api/users',  auth.requiresRole('admin'), users.getUsers);
    server.post('/api/users', users.createUser);
    server.put('/api/users',  auth.requiresApiLogin,  users.updateUser);
    
    server.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params);
    });

    server.get('/templates/*', function(req, res) {
        res.render('../../public/app/templates/' + req.params);
    });

    server.post('/login', auth.authenticate);
    server.get('/logout', function(req, res) {
        req.logout();
        res.end();
    });


    server.get('*', function(req, res) {

        res.render('index.jade', {

                locals : {
                    currentUser: req.user
                    ,title : 'Index page'
                    ,description: 'Page Description'
                    ,author: 'IOA'
                    ,analyticssiteid: 'XXXXXXX'

                }
            }
        );

    });

}
