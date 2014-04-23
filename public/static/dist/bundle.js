require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/**
 * Created by isuarez on 2/27/14.
 */

//We are getting angualr from cdn
var
    app_routes = require('../../public/app/config/routes.js'),
    controllers = require('../../public/app/controllers'),
    services = require('../../public/app/services'),
    resources = require('../../public/app/resources');


//Main Angular module. Cool
angular.module('app',
                  ['ngResource', 'ngRoute',
                  controllers.name, services.name, app_routes.name, resources.name]);

//Defining Routes
/*
app.config(function ($routeProvider, $locationProvider) {


        var routeRoleChecks = {

            admin: {
                auth: function(rcAuthSvc) {
                    return rcAuthSvc.authorizeCurrentUserForRoute('admin');
                }
            },

            user: {
                auth: function(rcAuthSvc) {
                    return rcAuthSvc.authorizeAuthenticatedUserForRoute();
                }
            }



        };

        $locationProvider.html5Mode(true);

        $routeProvider

            .when('/', {templateUrl: '/partials/main/main',
                        controller: 'rcMainCtrl'})

            .when('/admin/users', {templateUrl: '/partials/admin/user-list',
                                   controller: 'rcUserListCtrl',
                                   resolve: routeRoleChecks.admin
            })

            .when('/signup', {templateUrl: '/partials/account/signup',
                              controller: 'rcSignUpCtrl'})

            .when('/profile',{templateUrl: '/partials/account/profile',
                              controller: 'rcProfileCtrl',
                              resolve: routeRoleChecks.user });
    }

);
*/
angular.module('app').run(function($rootScope, $location)
{

    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });

});
},{"../../public/app/config/routes.js":4,"../../public/app/controllers":8,"../../public/app/resources":15,"../../public/app/services":20}],"9dpAQ+":[function(require,module,exports){
/**
 * Created by isuarez on 4/20/14.
 */

 var appPrefix = '/';
 var templateUrlPrefix = '/templates/';
 var appVersion = 1;

 module.exports = {

        version : appVersion,

        baseDirectory : appPrefix,
        templateDirectory : templateUrlPrefix,
        templateFileQuerystring : '?v=' + appVersion,

        routing : {

            prefix : '',
            html5Mode : true

        },

        viewUrlPrefix : templateUrlPrefix + 'views/',
        partialUrlPrefix : templateUrlPrefix + 'partials/',

        templateFileSuffix : '_tpl.html',

        prepareViewTemplateUrl : function(url) {
            return this.viewUrlPrefix + url + this.templateFileSuffix +
                this.templateFileQuerystring;
        }


};





},{}],"app_config":[function(require,module,exports){
module.exports=require('9dpAQ+');
},{}],4:[function(require,module,exports){
/**
 * Created by isuarez on 4/9/14.
 */

var config = require('app_config');
var router = require('../../../public/app/lib/router.js');


var app_routes = angular.module('App.Routes',[]);

app_routes.config(['$routeProvider', '$locationProvider',

        function ( $routeProvider, $locationProvider) {

            if (config.routing.html5Mode) {
                $locationProvider.html5Mode(true);
            }
            else {
                var routingPrefix = config.routing.prefix;
                if (routingPrefix && routingPrefix.length > 0) {
                    $locationProvider.hashPrefix(routingPrefix);
                }
            }

            router.when('roofer_dashboard_path', '/roofer/dashboard', {
                controller: 'rooferDashboardCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/dashboard')
            });

            router.when('roofer_inbox_path', '/roofer/inbox', {
                controller: 'rooferInboxCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/inbox')
            });

            router.when('roofer_jobs_path', '/roofer/jobs', {
                controller: 'rooferJobCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/jobs')
            });

            router.when('roofer_kunden_path', '/roofer/kunden', {
                controller: 'rooferKundenCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/kunden')
            });

            router.when('roofer_rechnung_path', '/roofer/rechnung', {
                controller: 'rooferRechnungCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/rechnung')
            });

            router.when('roofer_home_path', '/', {
                controller: 'rooferDashboardCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/dashboard')
            });

            router.alias('home_path', 'roofer_dashboard_path');

            router.otherwise({
                redirectTo: '/roofer/dashboard'
            });

            router.install($routeProvider);
        }]);

app_routes.run([ '$rootScope', '$location', function ( $rootScope, $location) {
        var prefix = '';
        if (!config.routing.html5Mode) {
            prefix = '#' + config.routing.prefix;
        }
        $rootScope.route = function (url, args) {
            return prefix + router.routePath(url, args);
        };

        $rootScope.r = $rootScope.route;

        $rootScope.c = function (route, value) {
            var url = router.routePath(route);
            if (url === $location.path()) {
                return value;
            }
        };
    }]);

module.exports = app_routes;

},{"../../../public/app/lib/router.js":14,"app_config":"9dpAQ+"}],5:[function(require,module,exports){
/**
 * Created by isuarez on 4/10/2014.
 */

'use strict';

module.exports =  function headerLoginCtrl($scope, $http, notifierSvc, identitySvc, authSvc, $location) {

    $scope.identity = identitySvc;
    $scope.signin = function (username, password) {

        authSvc.authenticateUser(username, password).then(function(success) {

                if (success) {
                    notifierSvc.notify('Success Login');
                }
                else
                    notifierSvc.notify('Error login in.');

            }
        );


        $scope.signout = function() {

            authSvc.logoutUser().then(function() {
                $scope.username = "";
                $scope.password = "";
                notifierSvc.notify('You have been successfylly signe out');
                $location.path("/");
            })
        }

    }

};
},{}],6:[function(require,module,exports){
/**
 * Created by isuarez on 4/10/2014.
 */
/**
 * Created by isuarez on 3/29/14.
 */

module.exports = function profileCtrl($scope, authSvc, identitySvc, notifierSvc) {

    //Assing the data
    var user = identitySvc.currentUser;
    $scope.email = user.username;
    $scope.fname = user.firstName;
    $scope.lname = user.lastName;


    //Update
    $scope.update = function() {

        var newUserData  =  {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        if ($scope.password && $scope.password.length > 0) {
            password: $scope.password;

        }

        //Call the rcAuth Service
        authSvc.updateCurrentUser(newUserData).then(
            //Success
            function () {
                notifierSvc.notify('User Account has been updated!');
            },
            //Fail
            function(reason) {
                notifierSvc.error(reason);
            });


    }

}
},{}],7:[function(require,module,exports){
/**
 * Created by isuarez on 3/27/14.
 */
module.exports =  function signupCtrl($scope, authSvc, notifierSvc, $location) {

    $scope.signup = function() {

        //Create the new UserData object
        var newUserData  =  {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        //Call the rcAuth Service
        authSvc.createUser(newUserData).then(
            //Success
            function () {
                notifierSvc.notify('User Account Created!');
                $location.path('/');
            },
            //Fail
            function(reason) {
                notifierSvc.error(reason);
            });
        //End Signup Function
    };




}
},{}],8:[function(require,module,exports){
'use strict';



module.exports = angular.module('App.Controllers', [])

    //Account
    //.controller('profileCtrl',  require(npath.join(process.cwd(), 'public', 'app', 'controllers', 'account','profileCtrl')))
    .controller('profileCtrl',  require('./account/profileCtrl'))
    .controller('headerLoginCtrl', require('./account/headerLoginCtrl'))
    .controller('signupCtrl', require('./account/signupCtrl'))

    //Admin

    //roofer
    .controller('rooferDashboardCtrl',require('./roofer/rooferDashboardCtrl'))
    .controller('rooferInboxCtrl',require('./roofer/rooferInboxCtrl'))
    .controller('rooferJobCtrl',require('./roofer/rooferJobCtrl'))
    .controller('rooferKunderCtrl',require('./roofer/rooferKunderCtrl'))
    .controller('rooferRechnungCtrl',require('./roofer/rooferRechnungCtrl'));


},{"./account/headerLoginCtrl":5,"./account/profileCtrl":6,"./account/signupCtrl":7,"./roofer/rooferDashboardCtrl":9,"./roofer/rooferInboxCtrl":10,"./roofer/rooferJobCtrl":11,"./roofer/rooferKunderCtrl":12,"./roofer/rooferRechnungCtrl":13}],9:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

module.exports = function rooferDashboardCtrl($scope) {

    //TODO;

};


},{}],10:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

module.exports = function rooferInboxCtrl ($scope) {

    //TODO;

}

},{}],11:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

module.exports = function rooferJobCtrl($scope, jobResource) {

       $scope.jobs = jobResource.query();

}

},{}],12:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

module.exports = function rooferKundenCtrl($scope) {

    //TODO;

}

},{}],13:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

module.exports = function rooferRechnungCtrl($scope) {

  //TODO;

}

},{}],14:[function(require,module,exports){
    var lookup = {};
    var otherwiseLookup = null;

    module.exports = {

        when : function(key, url, params) {
            lookup[key] = {
                url : url,
                params : params
            };
        },

        alias : function(key1, key2) {
            lookup[key1] = lookup[key2];
        },

        otherwise : function(params) {
            otherwiseLookup = params;
        },

        replaceUrlParams : function(url, params) {
            for(var k in params) {
                var v = params[k];
                url = url.replace(':'+k,v);
            }
            return url;
        },

        routeDefined : function(key) {
            return !! this.getRoute(key);
        },

        getRoute : function(key, args) {
            return lookup[key];
        },

        routePath : function(key, args) {
            var url = this.getRoute(key);
            url = url ? url.url : null;
            if(url && args) {
                url = this.replaceUrlParams(url, args);
            };
            return url;
        },

        install : function($routeProvider) {
            for(var key in lookup) {
                var route = lookup[key];
                var url = route['url'];
                var params = route['params'];
                $routeProvider.when(url, params);
            };
            if(otherwiseLookup) {
                $routeProvider.otherwise(otherwiseLookup);
            }
        }
    };


},{}],15:[function(require,module,exports){
'use strict';

module.exports = angular.module('App.Resources', [])

    //Account
    .factory('jobResource',require('./jobResource'))
    .factory('userResource',require('./userResource'));

},{"./jobResource":16,"./userResource":17}],16:[function(require,module,exports){
/**
 * Created by isuarez on 4/20/14.
 */

/**
 * Created by isuarez on 4/10/2014.
 */

/**
 * Created by isuarez on 3/25/14.
 */

module.exports = function jobResource($resource) {

    var JobResource = $resource('/api/contractor/jobs/:id', {_id: '@id'},
        {
            update: {method: 'PUT', isArray:false}
        }
    );



    return JobResource;
};

},{}],17:[function(require,module,exports){
/**
 * Created by isuarez on 4/10/2014.
 */

/**
 * Created by isuarez on 3/25/14.
 */

module.exports = function userResource($resource) {

    var UserResource = $resource('/api/users/:id', {_id: "@id"},
        {
            update: {method: 'PUT', isArray:false}
        }
    );

    UserResource.prototype.isAdmin = function () {
        return this.roles && this.hasRole('admin');
    };

    UserResource.prototype.isContractor = function() {
        return this.roles && this.hasRole('contractor');
    };

    UserResource.prototype.hasRole = function(role) {
        return this.roles.indexOf(role) > -1;
    };

    return UserResource;
};

},{}],18:[function(require,module,exports){
/**
 * Created by isuarez on 3/20/14.
 */

module.exports = function authSvc  ($http, identitySvc, $q, userResource) {

    return {

        authenticateUser: function (username, password) {
            var deferred = $q.defer();
            $http.post('/login', {username: username, password: password})
                .then(function (response) {
                    if (response.data.success) {
                        var user = new userResource();
                        angular.extend(user, response.data.user);
                        identitySvc.currentUser = user;
                        deferred.resolve(true);
                    }
                    else
                        deferred.resolve(false);

                });
            return deferred.promise;
        },


        createUser: function(newUserData) {

            var user = new userResource(newUserData);
            var deferred = $q.defer();

            user.$save().then(function() {
                    identitySvc.currentUser = user;
                    deferred.resolve();

                },
                function(response) {
                    deferred.reject(response.data.reason);
                }
            );

            return deferred.promise;
        },


        updateCurrentUser: function(newUserData) {

            //cloning the current user in order to extend it with newUSerData.
            //Only is save is success identitySvc.currentUser will be updated.
            var clone = angular.copy(identitySvc.currentUser);
            angular.extend(clone, newUserData);

            var deferred = $q.defer();

            clone.$update().then(function() {
                    identitySvc.currentUser = clone;
                    deferred.resolve();

                },
                function(response) {
                    deferred.reject(response.data.reason);
                }
            );

            return deferred.promise;
        },

        authorizeCurrentUserForRoute:  function (role) {
            if (identitySvc.isAuthorized(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },

        authorizeAuthenticatedUserForRoute:  function () {
            if (identitySvc.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },

        logoutUser: function () {

            var deffered = $q.defer();

            $http.get('/logout', {logout: true}).then(function () {

                    identitySvc.currentUser = undefined;
                    deffered.resolve();

                }
            );

            return deffered.promise;

        }

    };
}
},{}],19:[function(require,module,exports){
/**
 * Created by isuarez on 4/10/2014.
 */

module.exports = function identitySvc($window, userResource) {

    var currentUser;

    if (!!$window.currentUser ) {

        currentUser = new userResource();
        angular.extend(currentUser,$window.currentUser);
    }

    return {

        currentUser: currentUser,

        isAuthenticated: function() {
            return !!this.currentUser;
        },

        isAuthorized: function(role) {
            return this.isAuthenticated() && this.currentUser.hasRole(role);
        }


    }
}
},{}],20:[function(require,module,exports){
'use strict';

module.exports = angular.module('App.Services', [])

    //Account
    .factory('authSvc',require('./authSvc'))
    .factory('identitySvc',require('./identitySvc'))
    .factory('notifierSvc',require('./notifierSvc'));

},{"./authSvc":18,"./identitySvc":19,"./notifierSvc":21}],21:[function(require,module,exports){
/**
 * Created by isuarez on 3/20/14.
 */
var toastr = (window.toastr);


module.exports = function notifierSvc() {
    return {
        notify: function(msg) {
            toastr.success(msg);
            console.log(msg);
        },

        error: function(msg) {
            toastr.error(msg);
            console.error(msg);
        }
    }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9hcHAuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbmZpZy9jb25maWcuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL2FjY291bnQvaGVhZGVyTG9naW5DdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9hY2NvdW50L3Byb2ZpbGVDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9hY2NvdW50L3NpZ251cEN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL2luZGV4LmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9yb29mZXIvcm9vZmVyRGFzaGJvYXJkQ3RybC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvY29udHJvbGxlcnMvcm9vZmVyL3Jvb2ZlckluYm94Q3RybC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvY29udHJvbGxlcnMvcm9vZmVyL3Jvb2ZlckpvYkN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL3Jvb2Zlci9yb29mZXJLdW5kZXJDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9yb29mZXIvcm9vZmVyUmVjaG51bmdDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9saWIvcm91dGVyLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9yZXNvdXJjZXMvaW5kZXguanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3Jlc291cmNlcy9qb2JSZXNvdXJjZS5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvcmVzb3VyY2VzL3VzZXJSZXNvdXJjZS5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvc2VydmljZXMvYXV0aFN2Yy5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvc2VydmljZXMvaWRlbnRpdHlTdmMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3NlcnZpY2VzL2luZGV4LmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9zZXJ2aWNlcy9ub3RpZmllclN2Yy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMjcvMTQuXG4gKi9cblxuLy9XZSBhcmUgZ2V0dGluZyBhbmd1YWxyIGZyb20gY2RuXG52YXJcbiAgICBhcHBfcm91dGVzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2FwcC9jb25maWcvcm91dGVzLmpzJyksXG4gICAgY29udHJvbGxlcnMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzJyksXG4gICAgc2VydmljZXMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvYXBwL3NlcnZpY2VzJyksXG4gICAgcmVzb3VyY2VzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2FwcC9yZXNvdXJjZXMnKTtcblxuXG4vL01haW4gQW5ndWxhciBtb2R1bGUuIENvb2xcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuICAgICAgICAgICAgICAgICAgWyduZ1Jlc291cmNlJywgJ25nUm91dGUnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlcnMubmFtZSwgc2VydmljZXMubmFtZSwgYXBwX3JvdXRlcy5uYW1lLCByZXNvdXJjZXMubmFtZV0pO1xuXG4vL0RlZmluaW5nIFJvdXRlc1xuLypcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuXG5cbiAgICAgICAgdmFyIHJvdXRlUm9sZUNoZWNrcyA9IHtcblxuICAgICAgICAgICAgYWRtaW46IHtcbiAgICAgICAgICAgICAgICBhdXRoOiBmdW5jdGlvbihyY0F1dGhTdmMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJjQXV0aFN2Yy5hdXRob3JpemVDdXJyZW50VXNlckZvclJvdXRlKCdhZG1pbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICBhdXRoOiBmdW5jdGlvbihyY0F1dGhTdmMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJjQXV0aFN2Yy5hdXRob3JpemVBdXRoZW50aWNhdGVkVXNlckZvclJvdXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICB9O1xuXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcblxuICAgICAgICAkcm91dGVQcm92aWRlclxuXG4gICAgICAgICAgICAud2hlbignLycsIHt0ZW1wbGF0ZVVybDogJy9wYXJ0aWFscy9tYWluL21haW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3JjTWFpbkN0cmwnfSlcblxuICAgICAgICAgICAgLndoZW4oJy9hZG1pbi91c2VycycsIHt0ZW1wbGF0ZVVybDogJy9wYXJ0aWFscy9hZG1pbi91c2VyLWxpc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncmNVc2VyTGlzdEN0cmwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MuYWRtaW5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC53aGVuKCcvc2lnbnVwJywge3RlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL2FjY291bnQvc2lnbnVwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyY1NpZ25VcEN0cmwnfSlcblxuICAgICAgICAgICAgLndoZW4oJy9wcm9maWxlJyx7dGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvYWNjb3VudC9wcm9maWxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyY1Byb2ZpbGVDdHJsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy51c2VyIH0pO1xuICAgIH1cblxuKTtcbiovXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUsICRsb2NhdGlvbilcbntcblxuICAgICRyb290U2NvcGUuJG9uKCckcm91dGVDaGFuZ2VFcnJvcicsIGZ1bmN0aW9uKGV2dCwgY3VycmVudCwgcHJldmlvdXMsIHJlamVjdGlvbikge1xuICAgICAgICBpZiAocmVqZWN0aW9uID09PSAnbm90IGF1dGhvcml6ZWQnKSB7XG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMjAvMTQuXG4gKi9cblxuIHZhciBhcHBQcmVmaXggPSAnLyc7XG4gdmFyIHRlbXBsYXRlVXJsUHJlZml4ID0gJy90ZW1wbGF0ZXMvJztcbiB2YXIgYXBwVmVyc2lvbiA9IDE7XG5cbiBtb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgICAgICB2ZXJzaW9uIDogYXBwVmVyc2lvbixcblxuICAgICAgICBiYXNlRGlyZWN0b3J5IDogYXBwUHJlZml4LFxuICAgICAgICB0ZW1wbGF0ZURpcmVjdG9yeSA6IHRlbXBsYXRlVXJsUHJlZml4LFxuICAgICAgICB0ZW1wbGF0ZUZpbGVRdWVyeXN0cmluZyA6ICc/dj0nICsgYXBwVmVyc2lvbixcblxuICAgICAgICByb3V0aW5nIDoge1xuXG4gICAgICAgICAgICBwcmVmaXggOiAnJyxcbiAgICAgICAgICAgIGh0bWw1TW9kZSA6IHRydWVcblxuICAgICAgICB9LFxuXG4gICAgICAgIHZpZXdVcmxQcmVmaXggOiB0ZW1wbGF0ZVVybFByZWZpeCArICd2aWV3cy8nLFxuICAgICAgICBwYXJ0aWFsVXJsUHJlZml4IDogdGVtcGxhdGVVcmxQcmVmaXggKyAncGFydGlhbHMvJyxcblxuICAgICAgICB0ZW1wbGF0ZUZpbGVTdWZmaXggOiAnX3RwbC5odG1sJyxcblxuICAgICAgICBwcmVwYXJlVmlld1RlbXBsYXRlVXJsIDogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3VXJsUHJlZml4ICsgdXJsICsgdGhpcy50ZW1wbGF0ZUZpbGVTdWZmaXggK1xuICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVGaWxlUXVlcnlzdHJpbmc7XG4gICAgICAgIH1cblxuXG59O1xuXG5cblxuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzkvMTQuXG4gKi9cblxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJ2FwcF9jb25maWcnKTtcbnZhciByb3V0ZXIgPSByZXF1aXJlKCcuLi8uLi8uLi9wdWJsaWMvYXBwL2xpYi9yb3V0ZXIuanMnKTtcblxuXG52YXIgYXBwX3JvdXRlcyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuUm91dGVzJyxbXSk7XG5cbmFwcF9yb3V0ZXMuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLFxuXG4gICAgICAgIGZ1bmN0aW9uICggJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAgICAgICAgIGlmIChjb25maWcucm91dGluZy5odG1sNU1vZGUpIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcm91dGluZ1ByZWZpeCA9IGNvbmZpZy5yb3V0aW5nLnByZWZpeDtcbiAgICAgICAgICAgICAgICBpZiAocm91dGluZ1ByZWZpeCAmJiByb3V0aW5nUHJlZml4Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeChyb3V0aW5nUHJlZml4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfZGFzaGJvYXJkX3BhdGgnLCAnL3Jvb2Zlci9kYXNoYm9hcmQnLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jvb2ZlckRhc2hib2FyZEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb25maWcucHJlcGFyZVZpZXdUZW1wbGF0ZVVybCgncm9vZmVyL2Rhc2hib2FyZCcpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm91dGVyLndoZW4oJ3Jvb2Zlcl9pbmJveF9wYXRoJywgJy9yb29mZXIvaW5ib3gnLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jvb2ZlckluYm94Q3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbmZpZy5wcmVwYXJlVmlld1RlbXBsYXRlVXJsKCdyb29mZXIvaW5ib3gnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfam9ic19wYXRoJywgJy9yb29mZXIvam9icycsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVySm9iQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbmZpZy5wcmVwYXJlVmlld1RlbXBsYXRlVXJsKCdyb29mZXIvam9icycpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm91dGVyLndoZW4oJ3Jvb2Zlcl9rdW5kZW5fcGF0aCcsICcvcm9vZmVyL2t1bmRlbicsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVyS3VuZGVuQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbmZpZy5wcmVwYXJlVmlld1RlbXBsYXRlVXJsKCdyb29mZXIva3VuZGVuJylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3V0ZXIud2hlbigncm9vZmVyX3JlY2hudW5nX3BhdGgnLCAnL3Jvb2Zlci9yZWNobnVuZycsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVyUmVjaG51bmdDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ3Jvb2Zlci9yZWNobnVuZycpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm91dGVyLndoZW4oJ3Jvb2Zlcl9ob21lX3BhdGgnLCAnLycsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVyRGFzaGJvYXJkQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbmZpZy5wcmVwYXJlVmlld1RlbXBsYXRlVXJsKCdyb29mZXIvZGFzaGJvYXJkJylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3V0ZXIuYWxpYXMoJ2hvbWVfcGF0aCcsICdyb29mZXJfZGFzaGJvYXJkX3BhdGgnKTtcblxuICAgICAgICAgICAgcm91dGVyLm90aGVyd2lzZSh7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogJy9yb29mZXIvZGFzaGJvYXJkJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci5pbnN0YWxsKCRyb3V0ZVByb3ZpZGVyKTtcbiAgICAgICAgfV0pO1xuXG5hcHBfcm91dGVzLnJ1bihbICckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uICggJHJvb3RTY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciBwcmVmaXggPSAnJztcbiAgICAgICAgaWYgKCFjb25maWcucm91dGluZy5odG1sNU1vZGUpIHtcbiAgICAgICAgICAgIHByZWZpeCA9ICcjJyArIGNvbmZpZy5yb3V0aW5nLnByZWZpeDtcbiAgICAgICAgfVxuICAgICAgICAkcm9vdFNjb3BlLnJvdXRlID0gZnVuY3Rpb24gKHVybCwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIHByZWZpeCArIHJvdXRlci5yb3V0ZVBhdGgodXJsLCBhcmdzKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkcm9vdFNjb3BlLnIgPSAkcm9vdFNjb3BlLnJvdXRlO1xuXG4gICAgICAgICRyb290U2NvcGUuYyA9IGZ1bmN0aW9uIChyb3V0ZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciB1cmwgPSByb3V0ZXIucm91dGVQYXRoKHJvdXRlKTtcbiAgICAgICAgICAgIGlmICh1cmwgPT09ICRsb2NhdGlvbi5wYXRoKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfV0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcF9yb3V0ZXM7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICBmdW5jdGlvbiBoZWFkZXJMb2dpbkN0cmwoJHNjb3BlLCAkaHR0cCwgbm90aWZpZXJTdmMsIGlkZW50aXR5U3ZjLCBhdXRoU3ZjLCAkbG9jYXRpb24pIHtcblxuICAgICRzY29wZS5pZGVudGl0eSA9IGlkZW50aXR5U3ZjO1xuICAgICRzY29wZS5zaWduaW4gPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG5cbiAgICAgICAgYXV0aFN2Yy5hdXRoZW50aWNhdGVVc2VyKHVzZXJuYW1lLCBwYXNzd29yZCkudGhlbihmdW5jdGlvbihzdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5ub3RpZnkoJ1N1Y2Nlc3MgTG9naW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5ub3RpZnkoJ0Vycm9yIGxvZ2luIGluLicpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cblxuICAgICAgICAkc2NvcGUuc2lnbm91dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBhdXRoU3ZjLmxvZ291dFVzZXIoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS51c2VybmFtZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnBhc3N3b3JkID0gXCJcIjtcbiAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5ub3RpZnkoJ1lvdSBoYXZlIGJlZW4gc3VjY2Vzc2Z5bGx5IHNpZ25lIG91dCcpO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL1wiKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cblxufTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cbi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDMvMjkvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcm9maWxlQ3RybCgkc2NvcGUsIGF1dGhTdmMsIGlkZW50aXR5U3ZjLCBub3RpZmllclN2Yykge1xuXG4gICAgLy9Bc3NpbmcgdGhlIGRhdGFcbiAgICB2YXIgdXNlciA9IGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyO1xuICAgICRzY29wZS5lbWFpbCA9IHVzZXIudXNlcm5hbWU7XG4gICAgJHNjb3BlLmZuYW1lID0gdXNlci5maXJzdE5hbWU7XG4gICAgJHNjb3BlLmxuYW1lID0gdXNlci5sYXN0TmFtZTtcblxuXG4gICAgLy9VcGRhdGVcbiAgICAkc2NvcGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIG5ld1VzZXJEYXRhICA9ICB7XG4gICAgICAgICAgICB1c2VybmFtZTogJHNjb3BlLmVtYWlsLFxuICAgICAgICAgICAgZmlyc3ROYW1lOiAkc2NvcGUuZm5hbWUsXG4gICAgICAgICAgICBsYXN0TmFtZTogJHNjb3BlLmxuYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCRzY29wZS5wYXNzd29yZCAmJiAkc2NvcGUucGFzc3dvcmQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5wYXNzd29yZDtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy9DYWxsIHRoZSByY0F1dGggU2VydmljZVxuICAgICAgICBhdXRoU3ZjLnVwZGF0ZUN1cnJlbnRVc2VyKG5ld1VzZXJEYXRhKS50aGVuKFxuICAgICAgICAgICAgLy9TdWNjZXNzXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpZXJTdmMubm90aWZ5KCdVc2VyIEFjY291bnQgaGFzIGJlZW4gdXBkYXRlZCEnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvL0ZhaWxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIG5vdGlmaWVyU3ZjLmVycm9yKHJlYXNvbik7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMy8yNy8xNC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAgZnVuY3Rpb24gc2lnbnVwQ3RybCgkc2NvcGUsIGF1dGhTdmMsIG5vdGlmaWVyU3ZjLCAkbG9jYXRpb24pIHtcblxuICAgICRzY29wZS5zaWdudXAgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAvL0NyZWF0ZSB0aGUgbmV3IFVzZXJEYXRhIG9iamVjdFxuICAgICAgICB2YXIgbmV3VXNlckRhdGEgID0gIHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiAkc2NvcGUuZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkLFxuICAgICAgICAgICAgZmlyc3ROYW1lOiAkc2NvcGUuZm5hbWUsXG4gICAgICAgICAgICBsYXN0TmFtZTogJHNjb3BlLmxuYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgLy9DYWxsIHRoZSByY0F1dGggU2VydmljZVxuICAgICAgICBhdXRoU3ZjLmNyZWF0ZVVzZXIobmV3VXNlckRhdGEpLnRoZW4oXG4gICAgICAgICAgICAvL1N1Y2Nlc3NcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5ub3RpZnkoJ1VzZXIgQWNjb3VudCBDcmVhdGVkIScpO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy9GYWlsXG4gICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5lcnJvcihyZWFzb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vRW5kIFNpZ251cCBGdW5jdGlvblxuICAgIH07XG5cblxuXG5cbn0iLCIndXNlIHN0cmljdCc7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuQ29udHJvbGxlcnMnLCBbXSlcblxuICAgIC8vQWNjb3VudFxuICAgIC8vLmNvbnRyb2xsZXIoJ3Byb2ZpbGVDdHJsJywgIHJlcXVpcmUobnBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncHVibGljJywgJ2FwcCcsICdjb250cm9sbGVycycsICdhY2NvdW50JywncHJvZmlsZUN0cmwnKSkpXG4gICAgLmNvbnRyb2xsZXIoJ3Byb2ZpbGVDdHJsJywgIHJlcXVpcmUoJy4vYWNjb3VudC9wcm9maWxlQ3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdoZWFkZXJMb2dpbkN0cmwnLCByZXF1aXJlKCcuL2FjY291bnQvaGVhZGVyTG9naW5DdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ3NpZ251cEN0cmwnLCByZXF1aXJlKCcuL2FjY291bnQvc2lnbnVwQ3RybCcpKVxuXG4gICAgLy9BZG1pblxuXG4gICAgLy9yb29mZXJcbiAgICAuY29udHJvbGxlcigncm9vZmVyRGFzaGJvYXJkQ3RybCcscmVxdWlyZSgnLi9yb29mZXIvcm9vZmVyRGFzaGJvYXJkQ3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdyb29mZXJJbmJveEN0cmwnLHJlcXVpcmUoJy4vcm9vZmVyL3Jvb2ZlckluYm94Q3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdyb29mZXJKb2JDdHJsJyxyZXF1aXJlKCcuL3Jvb2Zlci9yb29mZXJKb2JDdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ3Jvb2Zlckt1bmRlckN0cmwnLHJlcXVpcmUoJy4vcm9vZmVyL3Jvb2Zlckt1bmRlckN0cmwnKSlcbiAgICAuY29udHJvbGxlcigncm9vZmVyUmVjaG51bmdDdHJsJyxyZXF1aXJlKCcuL3Jvb2Zlci9yb29mZXJSZWNobnVuZ0N0cmwnKSk7XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvb2ZlckRhc2hib2FyZEN0cmwoJHNjb3BlKSB7XG5cbiAgICAvL1RPRE87XG5cbn07XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvb2ZlckluYm94Q3RybCAoJHNjb3BlKSB7XG5cbiAgICAvL1RPRE87XG5cbn1cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvb2ZlckpvYkN0cmwoJHNjb3BlLCBqb2JSZXNvdXJjZSkge1xuXG4gICAgICAgJHNjb3BlLmpvYnMgPSBqb2JSZXNvdXJjZS5xdWVyeSgpO1xuXG59XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAyLzMvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb29mZXJLdW5kZW5DdHJsKCRzY29wZSkge1xuXG4gICAgLy9UT0RPO1xuXG59XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAyLzMvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb29mZXJSZWNobnVuZ0N0cmwoJHNjb3BlKSB7XG5cbiAgLy9UT0RPO1xuXG59XG4iLCIgICAgdmFyIGxvb2t1cCA9IHt9O1xuICAgIHZhciBvdGhlcndpc2VMb29rdXAgPSBudWxsO1xuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAgICAgd2hlbiA6IGZ1bmN0aW9uKGtleSwgdXJsLCBwYXJhbXMpIHtcbiAgICAgICAgICAgIGxvb2t1cFtrZXldID0ge1xuICAgICAgICAgICAgICAgIHVybCA6IHVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXMgOiBwYXJhbXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWxpYXMgOiBmdW5jdGlvbihrZXkxLCBrZXkyKSB7XG4gICAgICAgICAgICBsb29rdXBba2V5MV0gPSBsb29rdXBba2V5Ml07XG4gICAgICAgIH0sXG5cbiAgICAgICAgb3RoZXJ3aXNlIDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgICAgICBvdGhlcndpc2VMb29rdXAgPSBwYXJhbXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVwbGFjZVVybFBhcmFtcyA6IGZ1bmN0aW9uKHVybCwgcGFyYW1zKSB7XG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgdmFyIHYgPSBwYXJhbXNba107XG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoJzonK2ssdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJvdXRlRGVmaW5lZCA6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuICEhIHRoaXMuZ2V0Um91dGUoa2V5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRSb3V0ZSA6IGZ1bmN0aW9uKGtleSwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIGxvb2t1cFtrZXldO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJvdXRlUGF0aCA6IGZ1bmN0aW9uKGtleSwgYXJncykge1xuICAgICAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0Um91dGUoa2V5KTtcbiAgICAgICAgICAgIHVybCA9IHVybCA/IHVybC51cmwgOiBudWxsO1xuICAgICAgICAgICAgaWYodXJsICYmIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLnJlcGxhY2VVcmxQYXJhbXModXJsLCBhcmdzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluc3RhbGwgOiBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gbG9va3VwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvdXRlID0gbG9va3VwW2tleV07XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IHJvdXRlWyd1cmwnXTtcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0gcm91dGVbJ3BhcmFtcyddO1xuICAgICAgICAgICAgICAgICRyb3V0ZVByb3ZpZGVyLndoZW4odXJsLCBwYXJhbXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKG90aGVyd2lzZUxvb2t1cCkge1xuICAgICAgICAgICAgICAgICRyb3V0ZVByb3ZpZGVyLm90aGVyd2lzZShvdGhlcndpc2VMb29rdXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuUmVzb3VyY2VzJywgW10pXG5cbiAgICAvL0FjY291bnRcbiAgICAuZmFjdG9yeSgnam9iUmVzb3VyY2UnLHJlcXVpcmUoJy4vam9iUmVzb3VyY2UnKSlcbiAgICAuZmFjdG9yeSgndXNlclJlc291cmNlJyxyZXF1aXJlKCcuL3VzZXJSZXNvdXJjZScpKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMjAvMTQuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8xMC8yMDE0LlxuICovXG5cbi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDMvMjUvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBqb2JSZXNvdXJjZSgkcmVzb3VyY2UpIHtcblxuICAgIHZhciBKb2JSZXNvdXJjZSA9ICRyZXNvdXJjZSgnL2FwaS9jb250cmFjdG9yL2pvYnMvOmlkJywge19pZDogJ0BpZCd9LFxuICAgICAgICB7XG4gICAgICAgICAgICB1cGRhdGU6IHttZXRob2Q6ICdQVVQnLCBpc0FycmF5OmZhbHNlfVxuICAgICAgICB9XG4gICAgKTtcblxuXG5cbiAgICByZXR1cm4gSm9iUmVzb3VyY2U7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8xMC8yMDE0LlxuICovXG5cbi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDMvMjUvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB1c2VyUmVzb3VyY2UoJHJlc291cmNlKSB7XG5cbiAgICB2YXIgVXNlclJlc291cmNlID0gJHJlc291cmNlKCcvYXBpL3VzZXJzLzppZCcsIHtfaWQ6IFwiQGlkXCJ9LFxuICAgICAgICB7XG4gICAgICAgICAgICB1cGRhdGU6IHttZXRob2Q6ICdQVVQnLCBpc0FycmF5OmZhbHNlfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIFVzZXJSZXNvdXJjZS5wcm90b3R5cGUuaXNBZG1pbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm9sZXMgJiYgdGhpcy5oYXNSb2xlKCdhZG1pbicpO1xuICAgIH07XG5cbiAgICBVc2VyUmVzb3VyY2UucHJvdG90eXBlLmlzQ29udHJhY3RvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb2xlcyAmJiB0aGlzLmhhc1JvbGUoJ2NvbnRyYWN0b3InKTtcbiAgICB9O1xuXG4gICAgVXNlclJlc291cmNlLnByb3RvdHlwZS5oYXNSb2xlID0gZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb2xlcy5pbmRleE9mKHJvbGUpID4gLTE7XG4gICAgfTtcblxuICAgIHJldHVybiBVc2VyUmVzb3VyY2U7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMy8yMC8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGF1dGhTdmMgICgkaHR0cCwgaWRlbnRpdHlTdmMsICRxLCB1c2VyUmVzb3VyY2UpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgYXV0aGVudGljYXRlVXNlcjogZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9sb2dpbicsIHt1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IHVzZXJSZXNvdXJjZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5leHRlbmQodXNlciwgcmVzcG9uc2UuZGF0YS51c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyID0gdXNlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9LFxuXG5cbiAgICAgICAgY3JlYXRlVXNlcjogZnVuY3Rpb24obmV3VXNlckRhdGEpIHtcblxuICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgdXNlclJlc291cmNlKG5ld1VzZXJEYXRhKTtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIHVzZXIuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZGVudGl0eVN2Yy5jdXJyZW50VXNlciA9IHVzZXI7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlc3BvbnNlLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIHVwZGF0ZUN1cnJlbnRVc2VyOiBmdW5jdGlvbihuZXdVc2VyRGF0YSkge1xuXG4gICAgICAgICAgICAvL2Nsb25pbmcgdGhlIGN1cnJlbnQgdXNlciBpbiBvcmRlciB0byBleHRlbmQgaXQgd2l0aCBuZXdVU2VyRGF0YS5cbiAgICAgICAgICAgIC8vT25seSBpcyBzYXZlIGlzIHN1Y2Nlc3MgaWRlbnRpdHlTdmMuY3VycmVudFVzZXIgd2lsbCBiZSB1cGRhdGVkLlxuICAgICAgICAgICAgdmFyIGNsb25lID0gYW5ndWxhci5jb3B5KGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKGNsb25lLCBuZXdVc2VyRGF0YSk7XG5cbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIGNsb25lLiR1cGRhdGUoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZGVudGl0eVN2Yy5jdXJyZW50VXNlciA9IGNsb25lO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZXNwb25zZS5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXV0aG9yaXplQ3VycmVudFVzZXJGb3JSb3V0ZTogIGZ1bmN0aW9uIChyb2xlKSB7XG4gICAgICAgICAgICBpZiAoaWRlbnRpdHlTdmMuaXNBdXRob3JpemVkKHJvbGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KCdub3QgYXV0aG9yaXplZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGF1dGhvcml6ZUF1dGhlbnRpY2F0ZWRVc2VyRm9yUm91dGU6ICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaWRlbnRpdHlTdmMuaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoJ25vdCBhdXRob3JpemVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9nb3V0VXNlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgZGVmZmVyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9sb2dvdXQnLCB7bG9nb3V0OiB0cnVlfSkudGhlbihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlTdmMuY3VycmVudFVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGRlZmZlcmVkLnJlc29sdmUoKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZmZXJlZC5wcm9taXNlO1xuXG4gICAgICAgIH1cblxuICAgIH07XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8xMC8yMDE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaWRlbnRpdHlTdmMoJHdpbmRvdywgdXNlclJlc291cmNlKSB7XG5cbiAgICB2YXIgY3VycmVudFVzZXI7XG5cbiAgICBpZiAoISEkd2luZG93LmN1cnJlbnRVc2VyICkge1xuXG4gICAgICAgIGN1cnJlbnRVc2VyID0gbmV3IHVzZXJSZXNvdXJjZSgpO1xuICAgICAgICBhbmd1bGFyLmV4dGVuZChjdXJyZW50VXNlciwkd2luZG93LmN1cnJlbnRVc2VyKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGN1cnJlbnRVc2VyOiBjdXJyZW50VXNlcixcblxuICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5jdXJyZW50VXNlcjtcbiAgICAgICAgfSxcblxuICAgICAgICBpc0F1dGhvcml6ZWQ6IGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIHRoaXMuY3VycmVudFVzZXIuaGFzUm9sZShyb2xlKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuU2VydmljZXMnLCBbXSlcblxuICAgIC8vQWNjb3VudFxuICAgIC5mYWN0b3J5KCdhdXRoU3ZjJyxyZXF1aXJlKCcuL2F1dGhTdmMnKSlcbiAgICAuZmFjdG9yeSgnaWRlbnRpdHlTdmMnLHJlcXVpcmUoJy4vaWRlbnRpdHlTdmMnKSlcbiAgICAuZmFjdG9yeSgnbm90aWZpZXJTdmMnLHJlcXVpcmUoJy4vbm90aWZpZXJTdmMnKSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAzLzIwLzE0LlxuICovXG52YXIgdG9hc3RyID0gKHdpbmRvdy50b2FzdHIpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm90aWZpZXJTdmMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbm90aWZ5OiBmdW5jdGlvbihtc2cpIHtcbiAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKG1zZyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihtc2cpIHtcbiAgICAgICAgICAgIHRvYXN0ci5lcnJvcihtc2cpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiJdfQ==
