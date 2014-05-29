/**
 * Created by isuarez on 3/6/14.
 */

module.exports =  function(server, User, userController, jobController, requestsController, contractorController, auth, translationController) {

    server.get('/api/users',  auth.requiresRole('admin'), userController.getUsers(User));
    server.post('/api/users', userController.createUser(User));
    server.put('/api/users',  auth.requiresApiLogin,  userController.updateUser(User));

    server.post('/api/request', requestsController.createRequest());
    server.put('/api/request', requestsController.saveRequest());

    server.get('/api/contractor/jobs',  auth.requiresApiLogin, jobController.getJobs());
    server.get('/api/contractor/jobs/:id',  auth.requiresApiLogin, jobController.getJob());

    server.get('/api/contractor/inbox', auth.requiresApiLogin, jobController.getInboxes());
    server.get('/api/contractor/dashboard', auth.requiresApiLogin, contractorController.getDashboard());

    server.get('/api/translation', translationController.getTranslation());
    
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

    server.get('/order/*', function(req, res) {

            res.render('order/order_start.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: false,
                    title : 'Termin vereinbaren'
                    ,description: 'Termin vereinbaren'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/contractor/*', function(req, res) {

        res.render('contractor/contractor.jade', {

                locals : {
                    currentUser: req.user
                    ,moduleName: 'contractor'
                    ,title : 'Index page'
                    ,description: 'Page Description'
                    ,author: 'IOA'
                    ,analyticssiteid: 'XXXXXXX'

                }
            }
        );

    });

    server.get('/', function(req, res) {

        res.render('order/index.jade', {
            locals: {
                moduleName: 'main'
                ,breadCrump: false
                ,title : 'RoofCare'
                ,description: 'RoofCare'
                ,author: 'RoofCare'
                ,analyticssiteid: 'XXXXXXX'
            }
        })

        }
    );


};
