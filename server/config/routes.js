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
                    ,description: 'Dacharbeiten'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/dachreparatur', function(req, res) {

            res.render('site/dachreparatur.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'dacharbeiten',
                    title : 'Dachreparatur'
                    ,description: 'Dachreparatur'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                    ,dacharbeitenSideBarActive: 'dachreparatur'
                }
            })

        }
    );

    server.get('/dachcheck', function(req, res) {

            res.render('site/dachcheck.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'dacharbeiten',
                    title : 'Dachcheck'
                    ,description: 'Dachcheck'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                    ,dacharbeitenSideBarActive: 'dachcheck'

                }
            })

        }
    );

    server.get('/dachwartung', function(req, res) {

            res.render('site/dachwartung.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'dacharbeiten',
                    title : 'Dachwartung'
                    ,description: 'Dachwartung'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                    ,dacharbeitenSideBarActive: 'dachwartung'
                }
            })

        }
    );


    server.get('/steildach_definition', function(req, res) {

            res.render('site/steildach_definition.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'dacharbeiten',
                    title : 'Steildach Definition'
                    ,description: 'Steildach Definition'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                    ,dacharbeitenSideBarActive: 'steildach_definition'
                }
            })

        }
    );


    server.get('/steildach_besonderheiten', function(req, res) {

            res.render('site/steildach_besonderheiten.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'dacharbeiten',
                    title : 'Steildach Besonderheiten'
                    ,description: 'Steildach Besonderheiten'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                    ,dacharbeitenSideBarActive: 'steildach_besonderheiten'
                }
            })

        }
    );



    server.get('/flachdach_definition', function(req, res) {

            res.render('site/flachdach_definition.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'dacharbeiten',
                    title : 'Flachdach Definition'
                    ,description: 'Flachdach Definition'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                    ,dacharbeitenSideBarActive: 'flachdach_definition'
                }
            })

        }
    );

    server.get('/flachdach_besonderheiten', function(req, res) {

            res.render('site/flachdach_besonderheiten.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'dacharbeiten',
                    title : 'Flachdach Besonderheiten'
                    ,description: 'Flachdach Besonderheiten'
                    ,author: 'RoofCare'
                    ,analyticssiteid: 'XXXXXXX'
                    ,dacharbeitenSideBarActive: 'flachdach_besonderheiten'
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


    server.get('/kosten_dachreparatur', function(req, res) {

            res.render('site/kosten_dachreparatur.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    title : 'Kosten Dachreparatur'
                    ,description: 'Kosten Dachreparatur'
                    ,author: 'RoofCare'
                    ,activeMenu: 'kosten'
                    ,kostenSideBarActive: 'kosten_dachreparatur'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/kosten_dachcheck', function(req, res) {

            res.render('site/kosten_dachcheck.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    title : 'Kosten Dachcheck'
                    ,description: 'Kosten Dachcheck'
                    ,author: 'RoofCare'
                    ,activeMenu: 'kosten'
                    ,kostenSideBarActive: 'kosten_dachcheck'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/kosten_dachwartung', function(req, res) {

            res.render('site/kosten_dachwartung.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    title : 'Kosten Dachwartung'
                    ,description: 'Kosten Dachwartung'
                    ,author: 'RoofCare'
                    ,activeMenu: 'kosten'
                    ,kostenSideBarActive: 'kosten_dachwartung'
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

    server.get('/auftragsannahme', function(req, res) {

            res.render('site/auftragsannahme.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'warum_roofcare',
                    title : 'Auftragsannahme'
                    ,description: 'Auftragsannahme'
                    ,author: 'RoofCare'
                    ,activeMenu: 'warum_roofcare'
                    ,warumSideBarActive: 'auftragsannahme'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/kostentransparenz', function(req, res) {

            res.render('site/kostentransparenz.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'warum_roofcare',
                    title : 'Kostentransparenz'
                    ,description: 'Kostentransparenz'
                    ,author: 'RoofCare'
                    ,activeMenu: 'warum_roofcare'
                    ,warumSideBarActive: 'kostentransparenz'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/schnelligkeit', function(req, res) {

            res.render('site/schnelligkeit.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'warum_roofcare',
                    title : 'Schnelligkeit'
                    ,description: 'Schnelligkeit'
                    ,author: 'RoofCare'
                    ,activeMenu: 'warum_roofcare'
                    ,warumSideBarActive: 'schnelligkeit'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/qualitaet', function(req, res) {

            res.render('site/qualitaet.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    headerBarActive: 'warum_roofcare',
                    title : 'Qualitaet'
                    ,description: 'Qualitaet'
                    ,author: 'RoofCare'
                    ,activeMenu: 'warum_roofcare'
                    ,warumSideBarActive: 'qualitaet'
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
                    ,headerBarActive: 'uber_uns'
                    ,uberUnsSidebarActive: ''
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/zahlen_und_fakten', function(req, res) {

            res.render('site/zahlen_und_fakten.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    title : 'Zahlen und Fakten'
                    ,description: 'Zahlen und Fakten'
                    ,author: 'RoofCare'
                    ,headerBarActive: 'uber_uns'
                    ,uberUnsSidebarActive: 'zahlen_und_fakten'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/garantie', function(req, res) {

            res.render('site/garantie.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    title : 'Garantie'
                    ,description: 'Garantie'
                    ,author: 'RoofCare'
                    ,headerBarActive: 'uber_uns'
                    ,uberUnsSidebarActive: 'garantie'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/arbeitsschutz', function(req, res) {

            res.render('site/arbeitsschutz.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    title : 'Arbeitsschutz'
                    ,description: 'Arbeitsschutz'
                    ,author: 'RoofCare'
                    ,headerBarActive: 'uber_uns'
                    ,uberUnsSidebarActive: 'arbeitsschutz'
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
                    title : 'Mitverantwortung des Bauherren'
                    ,description: 'Über uns - Mitverantwortung des bauherren'
                    ,author: 'RoofCare'
                    ,headerBarActive: 'uber_uns'
                    ,uberUnsSidebarActive: 'mitverantwortung_des_bauherren'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/kontraktor_werden', function(req, res) {

            res.render('site/kontraktor_werden.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    title : 'Kontraktor werden'
                    ,description: 'Kontraktor werden'
                    ,author: 'RoofCare'
                    ,headerBarActive: 'uber_uns'
                    ,uberUnsSidebarActive: 'kontraktor_werden'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );

    server.get('/kunden_werben_kunden', function(req, res) {

            res.render('site/kunden_werben_kunden.jade', {
                locals: {
                    moduleName: 'main',
                    breadCrump: true,
                    title : 'Kunden werben Kunden'
                    ,description: 'Kunden werben Kunden'
                    ,author: 'RoofCare'
                    ,headerBarActive: 'uber_uns'
                    ,uberUnsSidebarActive: 'kunden_werben_kunden'
                    ,analyticssiteid: 'XXXXXXX'
                }
            })

        }
    );


  server.get('/login', function(req, res) {

    res.render('contractor/login.jade', {

        locals : {
          currentUser: req.user
          ,bodyClass: 'login contrast-background'
          ,moduleName: 'contractor'
          ,title : 'Login'
          ,description: 'Login'
          ,author: 'RC'
          ,analyticssiteid: 'XXXXXXX'

        }
      }
    );

  });


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
