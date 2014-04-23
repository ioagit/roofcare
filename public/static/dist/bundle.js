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
},{"../../public/app/config/routes.js":4,"../../public/app/controllers":8,"../../public/app/resources":15,"../../public/app/services":20}],"m+cUNR":[function(require,module,exports){
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
module.exports=require('m+cUNR');
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

},{"../../../public/app/lib/router.js":14,"app_config":"m+cUNR"}],5:[function(require,module,exports){
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
//var toastr = require('toastr');

//Toastr is provided as external lib

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