/**
 * Created by isuarez on 3/6/14.
 */

module.exports =  function(server, User, userController, jobController, contractorController,
                           auth, translationController, lookupsController) {

    server.get('/api/users',  auth.requiresRole('admin'), userController.getUsers(User));
    server.post('/api/users', userController.createUser(User));
    server.put('/api/users',  auth.requiresApiLogin,  userController.updateUser(User));

    server.post('/api/job', jobController.createJob());
    server.put('/api/job', jobController.saveJob());

    server.get('/api/contractor/jobs',  auth.requiresApiLogin, jobController.getJobs());
    server.get('/api/contractor/jobs/:id',  auth.requiresApiLogin, jobController.getJob());

    server.get('/api/contractor/inbox', auth.requiresApiLogin, jobController.getInboxes());
    server.get('/api/contractor/dashboard', auth.requiresApiLogin, contractorController.getDashboard());

    server.get('/api/translation', translationController.getTranslation());

    server.get('/api/lookups', lookupsController.getLookups());


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

            res.render('order/order.jade', {
                locals: {
                    moduleName: 'order',
                    breadCrump: true,
                    headerBarActive: 'order',
                    title : 'Termin vereinbaren'
                    ,description: 'Termin vereinbaren'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/kontakt', function(req, res) {

            res.render('site/kontakt.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'kontakt',
                    title : 'Kontakt'
                    ,description: 'Kontakt'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/bestehender_termin', function(req, res) {

            res.render('site/bestehender_termin.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'bestehender_termin',
                    title : 'Bestehender Termin'
                    ,description: 'Bestehender Termin'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/dacharbeiten', function(req, res) {

            res.render('site/dacharbeiten.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'dacharbeiten',
                    title : 'Dacharbeiten'
                    ,description: 'Bestehender'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/kosten', function(req, res) {

            res.render('site/kosten.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'kosten',
                    title : 'Kosten'
                    ,description: 'Kosten'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );
 server.get('/warum_roofcare', function(req, res) {

            res.render('site/warum_roofcare.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'warum_roofcare',
                    title : 'Warum Roofcare'
                    ,description: 'Warum Roofcare'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/faq', function(req, res) {

            res.render('site/faq.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    title : 'FAQ'
                    ,description: 'FAQ'
                    ,author: 'RoofCare'
                    ,activeMenu: 'none'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/uber_uns', function(req, res) {

            res.render('site/uber_uns.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    title : 'Über uns'
                    ,description: 'Über uns'
                    ,author: 'RoofCare'
                    ,activeMenu: 'uber_uns'
                    ,uberUnsSidebarActive: ''
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/mitverantwortung_des_bauherren', function(req, res) {

            res.render('site/mitverantwortung_des_bauherren.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    title : 'Über uns - Mitverantwortung des bauherren'
                    ,description: 'Über uns - Mitverantwortung des bauherren'
                    ,author: 'RoofCare'
                    ,activeMenu: 'uber_uns'
                    ,uberUnsSidebarActive: 'mitverantwortung_des_bauherren'
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
                moduleName: 'order'
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
