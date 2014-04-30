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
    resources = require('../../public/app/resources'),
    directives = require('../../public/app/directives')
    ;


//Main Angular module. Cool
angular.module('app',
                  ['ngResource', 'ngRoute',
                  controllers.name, services.name, app_routes.name, resources.name, directives.name]);

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
},{"../../public/app/config/routes.js":4,"../../public/app/controllers":8,"../../public/app/directives":14,"../../public/app/resources":17,"../../public/app/services":22}],"9dpAQ+":[function(require,module,exports){
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

},{"../../../public/app/lib/router.js":16,"app_config":"9dpAQ+"}],5:[function(require,module,exports){
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
            });;

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
/**
 * Created by isuarez on 4/29/14.
 */

'use strict';



module.exports = angular.module('App.Directives', [])

    .directive('jobStatus',  require('./jobStatus'));


},{"./jobStatus":15}],15:[function(require,module,exports){
/**
 * Created by isuarez on 4/29/14.
 */
var lookups = require('../../../server/models/lookups');

module.exports = function jobStatus() {
    return {
        scope: {
            status: '@',
            type: '@'
        },
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/templates/directives/jobStatus.html'
    };
}
},{"../../../server/models/lookups":24}],16:[function(require,module,exports){
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


},{}],17:[function(require,module,exports){
'use strict';

module.exports = angular.module('App.Resources', [])

    //Account
    .factory('jobResource',require('./jobResource'))
    .factory('userResource',require('./userResource'));

},{"./jobResource":18,"./userResource":19}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
'use strict';

module.exports = angular.module('App.Services', [])

    //Account
    .factory('authSvc',require('./authSvc'))
    .factory('identitySvc',require('./identitySvc'))
    .factory('notifierSvc',require('./notifierSvc'));

},{"./authSvc":20,"./identitySvc":21,"./notifierSvc":23}],23:[function(require,module,exports){
/**
 * Created by isuarez on 3/20/14.
 */
//toastr comes from vendor.min.js

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

},{}],24:[function(require,module,exports){
/**
 * Created by isuarez on 4/17/2014.
 */

module.exports = {

    roles: {

        admin: 'admin',
        contractor: 'contractor',
        customer: 'customer'

    },

    salutation: {

        Mr: 'Mr',
        Mrs: 'Ms',
        Miss: ''

    },

    //Should be translated
    orderType: {
        repair: 'roof repair',
        check: 'roof check'
    },

    roofType: {

        steep: 'Steep',
        flat: 'Flat',
        other: 'Other'
    },

    propertyType: {
        singleFamily: 'Single Family',
        multiFamily: 'Multi Family'
    },

    contactType: {
        owner: 'owner',
        renter: 'renter',
        concierge: 'concierge',
        roommate: 'roommate',
        neighbour: 'neighbour'
    },

    distanceType: {

        klm: 'kilometers',
        miles: 'miles'
    },

    jobStatus: {
        unknown : 'unknown',
        created: 'created',
        requestAccepted: 'request accepted',
        requestRejected: 'request rejected' ,
        workStarted: 'work started',
        workCompleted: 'work completed',
        workRejected: 'work rejected'
    },

    paymentType: {

        cash:'cash',
        bankTransfer: 'bank transfer',
        amex: 'amex',
        visa: 'visa',
        masterCard: 'master card',
        discoverCard: 'discover card'

    },

    UnitOfMeasure: {

        Piece: 'Piece',
        Meter: 'Meter',
        CubicMeter: 'CubicMeter'
    }


};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9hcHAuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbmZpZy9jb25maWcuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL2FjY291bnQvaGVhZGVyTG9naW5DdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9hY2NvdW50L3Byb2ZpbGVDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9hY2NvdW50L3NpZ251cEN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL2luZGV4LmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9yb29mZXIvcm9vZmVyRGFzaGJvYXJkQ3RybC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvY29udHJvbGxlcnMvcm9vZmVyL3Jvb2ZlckluYm94Q3RybC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvY29udHJvbGxlcnMvcm9vZmVyL3Jvb2ZlckpvYkN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL3Jvb2Zlci9yb29mZXJLdW5kZXJDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9yb29mZXIvcm9vZmVyUmVjaG51bmdDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9kaXJlY3RpdmVzL2luZGV4LmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9kaXJlY3RpdmVzL2pvYlN0YXR1cy5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvbGliL3JvdXRlci5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvcmVzb3VyY2VzL2luZGV4LmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9yZXNvdXJjZXMvam9iUmVzb3VyY2UuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3Jlc291cmNlcy91c2VyUmVzb3VyY2UuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3NlcnZpY2VzL2F1dGhTdmMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3NlcnZpY2VzL2lkZW50aXR5U3ZjLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9zZXJ2aWNlcy9pbmRleC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvc2VydmljZXMvbm90aWZpZXJTdmMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9zZXJ2ZXIvbW9kZWxzL2xvb2t1cHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMi8yNy8xNC5cbiAqL1xuXG4vL1dlIGFyZSBnZXR0aW5nIGFuZ3VhbHIgZnJvbSBjZG5cbnZhclxuICAgIGFwcF9yb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvYXBwL2NvbmZpZy9yb3V0ZXMuanMnKSxcbiAgICBjb250cm9sbGVycyA9IHJlcXVpcmUoJy4uLy4uL3B1YmxpYy9hcHAvY29udHJvbGxlcnMnKSxcbiAgICBzZXJ2aWNlcyA9IHJlcXVpcmUoJy4uLy4uL3B1YmxpYy9hcHAvc2VydmljZXMnKSxcbiAgICByZXNvdXJjZXMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvYXBwL3Jlc291cmNlcycpLFxuICAgIGRpcmVjdGl2ZXMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvYXBwL2RpcmVjdGl2ZXMnKVxuICAgIDtcblxuXG4vL01haW4gQW5ndWxhciBtb2R1bGUuIENvb2xcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuICAgICAgICAgICAgICAgICAgWyduZ1Jlc291cmNlJywgJ25nUm91dGUnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlcnMubmFtZSwgc2VydmljZXMubmFtZSwgYXBwX3JvdXRlcy5uYW1lLCByZXNvdXJjZXMubmFtZSwgZGlyZWN0aXZlcy5uYW1lXSk7XG5cbi8vRGVmaW5pbmcgUm91dGVzXG4vKlxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cblxuICAgICAgICB2YXIgcm91dGVSb2xlQ2hlY2tzID0ge1xuXG4gICAgICAgICAgICBhZG1pbjoge1xuICAgICAgICAgICAgICAgIGF1dGg6IGZ1bmN0aW9uKHJjQXV0aFN2Yykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmNBdXRoU3ZjLmF1dGhvcml6ZUN1cnJlbnRVc2VyRm9yUm91dGUoJ2FkbWluJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgIGF1dGg6IGZ1bmN0aW9uKHJjQXV0aFN2Yykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmNBdXRoU3ZjLmF1dGhvcml6ZUF1dGhlbnRpY2F0ZWRVc2VyRm9yUm91dGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuXG4gICAgICAgIH07XG5cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXG5cbiAgICAgICAgICAgIC53aGVuKCcvJywge3RlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL21haW4vbWFpbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncmNNYWluQ3RybCd9KVxuXG4gICAgICAgICAgICAud2hlbignL2FkbWluL3VzZXJzJywge3RlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL2FkbWluL3VzZXItbGlzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyY1VzZXJMaXN0Q3RybCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5hZG1pblxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLndoZW4oJy9zaWdudXAnLCB7dGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvYWNjb3VudC9zaWdudXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3JjU2lnblVwQ3RybCd9KVxuXG4gICAgICAgICAgICAud2hlbignL3Byb2ZpbGUnLHt0ZW1wbGF0ZVVybDogJy9wYXJ0aWFscy9hY2NvdW50L3Byb2ZpbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3JjUHJvZmlsZUN0cmwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLnVzZXIgfSk7XG4gICAgfVxuXG4pO1xuKi9cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvY2F0aW9uKVxue1xuXG4gICAgJHJvb3RTY29wZS4kb24oJyRyb3V0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24oZXZ0LCBjdXJyZW50LCBwcmV2aW91cywgcmVqZWN0aW9uKSB7XG4gICAgICAgIGlmIChyZWplY3Rpb24gPT09ICdub3QgYXV0aG9yaXplZCcpIHtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8yMC8xNC5cbiAqL1xuXG4gdmFyIGFwcFByZWZpeCA9ICcvJztcbiB2YXIgdGVtcGxhdGVVcmxQcmVmaXggPSAnL3RlbXBsYXRlcy8nO1xuIHZhciBhcHBWZXJzaW9uID0gMTtcblxuIG1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgICAgIHZlcnNpb24gOiBhcHBWZXJzaW9uLFxuXG4gICAgICAgIGJhc2VEaXJlY3RvcnkgOiBhcHBQcmVmaXgsXG4gICAgICAgIHRlbXBsYXRlRGlyZWN0b3J5IDogdGVtcGxhdGVVcmxQcmVmaXgsXG4gICAgICAgIHRlbXBsYXRlRmlsZVF1ZXJ5c3RyaW5nIDogJz92PScgKyBhcHBWZXJzaW9uLFxuXG4gICAgICAgIHJvdXRpbmcgOiB7XG5cbiAgICAgICAgICAgIHByZWZpeCA6ICcnLFxuICAgICAgICAgICAgaHRtbDVNb2RlIDogdHJ1ZVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdmlld1VybFByZWZpeCA6IHRlbXBsYXRlVXJsUHJlZml4ICsgJ3ZpZXdzLycsXG4gICAgICAgIHBhcnRpYWxVcmxQcmVmaXggOiB0ZW1wbGF0ZVVybFByZWZpeCArICdwYXJ0aWFscy8nLFxuXG4gICAgICAgIHRlbXBsYXRlRmlsZVN1ZmZpeCA6ICdfdHBsLmh0bWwnLFxuXG4gICAgICAgIHByZXBhcmVWaWV3VGVtcGxhdGVVcmwgOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXdVcmxQcmVmaXggKyB1cmwgKyB0aGlzLnRlbXBsYXRlRmlsZVN1ZmZpeCArXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUZpbGVRdWVyeXN0cmluZztcbiAgICAgICAgfVxuXG5cbn07XG5cblxuXG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvOS8xNC5cbiAqL1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnYXBwX2NvbmZpZycpO1xudmFyIHJvdXRlciA9IHJlcXVpcmUoJy4uLy4uLy4uL3B1YmxpYy9hcHAvbGliL3JvdXRlci5qcycpO1xuXG5cbnZhciBhcHBfcm91dGVzID0gYW5ndWxhci5tb2R1bGUoJ0FwcC5Sb3V0ZXMnLFtdKTtcblxuYXBwX3JvdXRlcy5jb25maWcoWyckcm91dGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlcicsXG5cbiAgICAgICAgZnVuY3Rpb24gKCAkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICAgICAgICAgaWYgKGNvbmZpZy5yb3V0aW5nLmh0bWw1TW9kZSkge1xuICAgICAgICAgICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciByb3V0aW5nUHJlZml4ID0gY29uZmlnLnJvdXRpbmcucHJlZml4O1xuICAgICAgICAgICAgICAgIGlmIChyb3V0aW5nUHJlZml4ICYmIHJvdXRpbmdQcmVmaXgubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KHJvdXRpbmdQcmVmaXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcm91dGVyLndoZW4oJ3Jvb2Zlcl9kYXNoYm9hcmRfcGF0aCcsICcvcm9vZmVyL2Rhc2hib2FyZCcsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVyRGFzaGJvYXJkQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbmZpZy5wcmVwYXJlVmlld1RlbXBsYXRlVXJsKCdyb29mZXIvZGFzaGJvYXJkJylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3V0ZXIud2hlbigncm9vZmVyX2luYm94X3BhdGgnLCAnL3Jvb2Zlci9pbmJveCcsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVySW5ib3hDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ3Jvb2Zlci9pbmJveCcpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm91dGVyLndoZW4oJ3Jvb2Zlcl9qb2JzX3BhdGgnLCAnL3Jvb2Zlci9qb2JzJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyb29mZXJKb2JDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ3Jvb2Zlci9qb2JzJylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3V0ZXIud2hlbigncm9vZmVyX2t1bmRlbl9wYXRoJywgJy9yb29mZXIva3VuZGVuJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyb29mZXJLdW5kZW5DdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ3Jvb2Zlci9rdW5kZW4nKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfcmVjaG51bmdfcGF0aCcsICcvcm9vZmVyL3JlY2hudW5nJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyb29mZXJSZWNobnVuZ0N0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb25maWcucHJlcGFyZVZpZXdUZW1wbGF0ZVVybCgncm9vZmVyL3JlY2hudW5nJylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3V0ZXIud2hlbigncm9vZmVyX2hvbWVfcGF0aCcsICcvJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyb29mZXJEYXNoYm9hcmRDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ3Jvb2Zlci9kYXNoYm9hcmQnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci5hbGlhcygnaG9tZV9wYXRoJywgJ3Jvb2Zlcl9kYXNoYm9hcmRfcGF0aCcpO1xuXG4gICAgICAgICAgICByb3V0ZXIub3RoZXJ3aXNlKHtcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiAnL3Jvb2Zlci9kYXNoYm9hcmQnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm91dGVyLmluc3RhbGwoJHJvdXRlUHJvdmlkZXIpO1xuICAgICAgICB9XSk7XG5cbmFwcF9yb3V0ZXMucnVuKFsgJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgZnVuY3Rpb24gKCAkcm9vdFNjb3BlLCAkbG9jYXRpb24pIHtcbiAgICAgICAgdmFyIHByZWZpeCA9ICcnO1xuICAgICAgICBpZiAoIWNvbmZpZy5yb3V0aW5nLmh0bWw1TW9kZSkge1xuICAgICAgICAgICAgcHJlZml4ID0gJyMnICsgY29uZmlnLnJvdXRpbmcucHJlZml4O1xuICAgICAgICB9XG4gICAgICAgICRyb290U2NvcGUucm91dGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ICsgcm91dGVyLnJvdXRlUGF0aCh1cmwsIGFyZ3MpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRyb290U2NvcGUuciA9ICRyb290U2NvcGUucm91dGU7XG5cbiAgICAgICAgJHJvb3RTY29wZS5jID0gZnVuY3Rpb24gKHJvdXRlLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHVybCA9IHJvdXRlci5yb3V0ZVBhdGgocm91dGUpO1xuICAgICAgICAgICAgaWYgKHVybCA9PT0gJGxvY2F0aW9uLnBhdGgoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwX3JvdXRlcztcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMTAvMjAxNC5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gIGZ1bmN0aW9uIGhlYWRlckxvZ2luQ3RybCgkc2NvcGUsICRodHRwLCBub3RpZmllclN2YywgaWRlbnRpdHlTdmMsIGF1dGhTdmMsICRsb2NhdGlvbikge1xuXG4gICAgJHNjb3BlLmlkZW50aXR5ID0gaWRlbnRpdHlTdmM7XG4gICAgJHNjb3BlLnNpZ25pbiA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcblxuICAgICAgICBhdXRoU3ZjLmF1dGhlbnRpY2F0ZVVzZXIodXNlcm5hbWUsIHBhc3N3b3JkKS50aGVuKGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWVyU3ZjLm5vdGlmeSgnU3VjY2VzcyBMb2dpbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWVyU3ZjLm5vdGlmeSgnRXJyb3IgbG9naW4gaW4uJyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuXG4gICAgICAgICRzY29wZS5zaWdub3V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGF1dGhTdmMubG9nb3V0VXNlcigpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnVzZXJuYW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICAkc2NvcGUucGFzc3dvcmQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIG5vdGlmaWVyU3ZjLm5vdGlmeSgnWW91IGhhdmUgYmVlbiBzdWNjZXNzZnlsbHkgc2lnbmUgb3V0Jyk7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfVxuXG59OyIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMTAvMjAxNC5cbiAqL1xuLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMy8yOS8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHByb2ZpbGVDdHJsKCRzY29wZSwgYXV0aFN2YywgaWRlbnRpdHlTdmMsIG5vdGlmaWVyU3ZjKSB7XG5cbiAgICAvL0Fzc2luZyB0aGUgZGF0YVxuICAgIHZhciB1c2VyID0gaWRlbnRpdHlTdmMuY3VycmVudFVzZXI7XG4gICAgJHNjb3BlLmVtYWlsID0gdXNlci51c2VybmFtZTtcbiAgICAkc2NvcGUuZm5hbWUgPSB1c2VyLmZpcnN0TmFtZTtcbiAgICAkc2NvcGUubG5hbWUgPSB1c2VyLmxhc3ROYW1lO1xuXG5cbiAgICAvL1VwZGF0ZVxuICAgICRzY29wZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgbmV3VXNlckRhdGEgID0gIHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiAkc2NvcGUuZW1haWwsXG4gICAgICAgICAgICBmaXJzdE5hbWU6ICRzY29wZS5mbmFtZSxcbiAgICAgICAgICAgIGxhc3ROYW1lOiAkc2NvcGUubG5hbWVcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoJHNjb3BlLnBhc3N3b3JkICYmICRzY29wZS5wYXNzd29yZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvL0NhbGwgdGhlIHJjQXV0aCBTZXJ2aWNlXG4gICAgICAgIGF1dGhTdmMudXBkYXRlQ3VycmVudFVzZXIobmV3VXNlckRhdGEpLnRoZW4oXG4gICAgICAgICAgICAvL1N1Y2Nlc3NcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5ub3RpZnkoJ1VzZXIgQWNjb3VudCBoYXMgYmVlbiB1cGRhdGVkIScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vRmFpbFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpZXJTdmMuZXJyb3IocmVhc29uKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAzLzI3LzE0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9ICBmdW5jdGlvbiBzaWdudXBDdHJsKCRzY29wZSwgYXV0aFN2Yywgbm90aWZpZXJTdmMsICRsb2NhdGlvbikge1xuXG4gICAgJHNjb3BlLnNpZ251cCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8vQ3JlYXRlIHRoZSBuZXcgVXNlckRhdGEgb2JqZWN0XG4gICAgICAgIHZhciBuZXdVc2VyRGF0YSAgPSAge1xuICAgICAgICAgICAgdXNlcm5hbWU6ICRzY29wZS5lbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUucGFzc3dvcmQsXG4gICAgICAgICAgICBmaXJzdE5hbWU6ICRzY29wZS5mbmFtZSxcbiAgICAgICAgICAgIGxhc3ROYW1lOiAkc2NvcGUubG5hbWVcbiAgICAgICAgfTtcblxuICAgICAgICAvL0NhbGwgdGhlIHJjQXV0aCBTZXJ2aWNlXG4gICAgICAgIGF1dGhTdmMuY3JlYXRlVXNlcihuZXdVc2VyRGF0YSkudGhlbihcbiAgICAgICAgICAgIC8vU3VjY2Vzc1xuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWVyU3ZjLm5vdGlmeSgnVXNlciBBY2NvdW50IENyZWF0ZWQhJyk7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvL0ZhaWxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIG5vdGlmaWVyU3ZjLmVycm9yKHJlYXNvbik7XG4gICAgICAgICAgICB9KTs7XG5cbiAgICAgICAgLy9FbmQgU2lnbnVwIEZ1bmN0aW9uXG4gICAgfTtcblxuXG5cblxuXG5cbn0iLCIndXNlIHN0cmljdCc7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuQ29udHJvbGxlcnMnLCBbXSlcblxuICAgIC8vQWNjb3VudFxuICAgIC8vLmNvbnRyb2xsZXIoJ3Byb2ZpbGVDdHJsJywgIHJlcXVpcmUobnBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncHVibGljJywgJ2FwcCcsICdjb250cm9sbGVycycsICdhY2NvdW50JywncHJvZmlsZUN0cmwnKSkpXG4gICAgLmNvbnRyb2xsZXIoJ3Byb2ZpbGVDdHJsJywgIHJlcXVpcmUoJy4vYWNjb3VudC9wcm9maWxlQ3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdoZWFkZXJMb2dpbkN0cmwnLCByZXF1aXJlKCcuL2FjY291bnQvaGVhZGVyTG9naW5DdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ3NpZ251cEN0cmwnLCByZXF1aXJlKCcuL2FjY291bnQvc2lnbnVwQ3RybCcpKVxuXG4gICAgLy9BZG1pblxuXG4gICAgLy9yb29mZXJcbiAgICAuY29udHJvbGxlcigncm9vZmVyRGFzaGJvYXJkQ3RybCcscmVxdWlyZSgnLi9yb29mZXIvcm9vZmVyRGFzaGJvYXJkQ3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdyb29mZXJJbmJveEN0cmwnLHJlcXVpcmUoJy4vcm9vZmVyL3Jvb2ZlckluYm94Q3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdyb29mZXJKb2JDdHJsJyxyZXF1aXJlKCcuL3Jvb2Zlci9yb29mZXJKb2JDdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ3Jvb2Zlckt1bmRlckN0cmwnLHJlcXVpcmUoJy4vcm9vZmVyL3Jvb2Zlckt1bmRlckN0cmwnKSlcbiAgICAuY29udHJvbGxlcigncm9vZmVyUmVjaG51bmdDdHJsJyxyZXF1aXJlKCcuL3Jvb2Zlci9yb29mZXJSZWNobnVuZ0N0cmwnKSk7XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvb2ZlckRhc2hib2FyZEN0cmwoJHNjb3BlKSB7XG5cbiAgICAvL1RPRE87XG5cbn07XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvb2ZlckluYm94Q3RybCAoJHNjb3BlKSB7XG5cbiAgICAvL1RPRE87XG5cbn1cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvb2ZlckpvYkN0cmwoJHNjb3BlLCBqb2JSZXNvdXJjZSkge1xuXG4gICAgICAgJHNjb3BlLmpvYnMgPSBqb2JSZXNvdXJjZS5xdWVyeSgpO1xuXG59XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAyLzMvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb29mZXJLdW5kZW5DdHJsKCRzY29wZSkge1xuXG4gICAgLy9UT0RPO1xuXG59XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAyLzMvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb29mZXJSZWNobnVuZ0N0cmwoJHNjb3BlKSB7XG5cbiAgLy9UT0RPO1xuXG59XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzI5LzE0LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0FwcC5EaXJlY3RpdmVzJywgW10pXG5cbiAgICAuZGlyZWN0aXZlKCdqb2JTdGF0dXMnLCAgcmVxdWlyZSgnLi9qb2JTdGF0dXMnKSk7XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMjkvMTQuXG4gKi9cbnZhciBsb29rdXBzID0gcmVxdWlyZSgnLi4vLi4vLi4vc2VydmVyL21vZGVscy9sb29rdXBzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gam9iU3RhdHVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBzdGF0dXM6ICdAJyxcbiAgICAgICAgICAgIHR5cGU6ICdAJ1xuICAgICAgICB9LFxuICAgICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgICAgcmVwbGFjZTogJ3RydWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy90ZW1wbGF0ZXMvZGlyZWN0aXZlcy9qb2JTdGF0dXMuaHRtbCdcbiAgICB9O1xufSIsIiAgICB2YXIgbG9va3VwID0ge307XG4gICAgdmFyIG90aGVyd2lzZUxvb2t1cCA9IG51bGw7XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgICAgICB3aGVuIDogZnVuY3Rpb24oa2V5LCB1cmwsIHBhcmFtcykge1xuICAgICAgICAgICAgbG9va3VwW2tleV0gPSB7XG4gICAgICAgICAgICAgICAgdXJsIDogdXJsLFxuICAgICAgICAgICAgICAgIHBhcmFtcyA6IHBhcmFtc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICBhbGlhcyA6IGZ1bmN0aW9uKGtleTEsIGtleTIpIHtcbiAgICAgICAgICAgIGxvb2t1cFtrZXkxXSA9IGxvb2t1cFtrZXkyXTtcbiAgICAgICAgfSxcblxuICAgICAgICBvdGhlcndpc2UgOiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgICAgIG90aGVyd2lzZUxvb2t1cCA9IHBhcmFtcztcbiAgICAgICAgfSxcblxuICAgICAgICByZXBsYWNlVXJsUGFyYW1zIDogZnVuY3Rpb24odXJsLCBwYXJhbXMpIHtcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IHBhcmFtc1trXTtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgnOicrayx2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcm91dGVEZWZpbmVkIDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gISEgdGhpcy5nZXRSb3V0ZShrZXkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFJvdXRlIDogZnVuY3Rpb24oa2V5LCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9va3VwW2tleV07XG4gICAgICAgIH0sXG5cbiAgICAgICAgcm91dGVQYXRoIDogZnVuY3Rpb24oa2V5LCBhcmdzKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gdGhpcy5nZXRSb3V0ZShrZXkpO1xuICAgICAgICAgICAgdXJsID0gdXJsID8gdXJsLnVybCA6IG51bGw7XG4gICAgICAgICAgICBpZih1cmwgJiYgYXJncykge1xuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMucmVwbGFjZVVybFBhcmFtcyh1cmwsIGFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5zdGFsbCA6IGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBsb29rdXApIHtcbiAgICAgICAgICAgICAgICB2YXIgcm91dGUgPSBsb29rdXBba2V5XTtcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gcm91dGVbJ3VybCddO1xuICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSByb3V0ZVsncGFyYW1zJ107XG4gICAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXIud2hlbih1cmwsIHBhcmFtcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYob3RoZXJ3aXNlTG9va3VwKSB7XG4gICAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXIub3RoZXJ3aXNlKG90aGVyd2lzZUxvb2t1cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0FwcC5SZXNvdXJjZXMnLCBbXSlcblxuICAgIC8vQWNjb3VudFxuICAgIC5mYWN0b3J5KCdqb2JSZXNvdXJjZScscmVxdWlyZSgnLi9qb2JSZXNvdXJjZScpKVxuICAgIC5mYWN0b3J5KCd1c2VyUmVzb3VyY2UnLHJlcXVpcmUoJy4vdXNlclJlc291cmNlJykpO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8yMC8xNC5cbiAqL1xuXG4vKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMy8yNS8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGpvYlJlc291cmNlKCRyZXNvdXJjZSkge1xuXG4gICAgdmFyIEpvYlJlc291cmNlID0gJHJlc291cmNlKCcvYXBpL2NvbnRyYWN0b3Ivam9icy86aWQnLCB7X2lkOiAnQGlkJ30sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVwZGF0ZToge21ldGhvZDogJ1BVVCcsIGlzQXJyYXk6ZmFsc2V9XG4gICAgICAgIH1cbiAgICApO1xuXG5cblxuICAgIHJldHVybiBKb2JSZXNvdXJjZTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMy8yNS8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHVzZXJSZXNvdXJjZSgkcmVzb3VyY2UpIHtcblxuICAgIHZhciBVc2VyUmVzb3VyY2UgPSAkcmVzb3VyY2UoJy9hcGkvdXNlcnMvOmlkJywge19pZDogXCJAaWRcIn0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVwZGF0ZToge21ldGhvZDogJ1BVVCcsIGlzQXJyYXk6ZmFsc2V9XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgVXNlclJlc291cmNlLnByb3RvdHlwZS5pc0FkbWluID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb2xlcyAmJiB0aGlzLmhhc1JvbGUoJ2FkbWluJyk7XG4gICAgfTtcblxuICAgIFVzZXJSZXNvdXJjZS5wcm90b3R5cGUuaXNDb250cmFjdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVzICYmIHRoaXMuaGFzUm9sZSgnY29udHJhY3RvcicpO1xuICAgIH07XG5cbiAgICBVc2VyUmVzb3VyY2UucHJvdG90eXBlLmhhc1JvbGUgPSBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVzLmluZGV4T2Yocm9sZSkgPiAtMTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFVzZXJSZXNvdXJjZTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAzLzIwLzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXV0aFN2YyAgKCRodHRwLCBpZGVudGl0eVN2YywgJHEsIHVzZXJSZXNvdXJjZSkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBhdXRoZW50aWNhdGVVc2VyOiBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2xvZ2luJywge3VzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgdXNlclJlc291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmV4dGVuZCh1c2VyLCByZXNwb25zZS5kYXRhLnVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlTdmMuY3VycmVudFVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0sXG5cblxuICAgICAgICBjcmVhdGVVc2VyOiBmdW5jdGlvbihuZXdVc2VyRGF0YSkge1xuXG4gICAgICAgICAgICB2YXIgdXNlciA9IG5ldyB1c2VyUmVzb3VyY2UobmV3VXNlckRhdGEpO1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgdXNlci4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyID0gdXNlcjtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVzcG9uc2UuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9LFxuXG5cbiAgICAgICAgdXBkYXRlQ3VycmVudFVzZXI6IGZ1bmN0aW9uKG5ld1VzZXJEYXRhKSB7XG5cbiAgICAgICAgICAgIC8vY2xvbmluZyB0aGUgY3VycmVudCB1c2VyIGluIG9yZGVyIHRvIGV4dGVuZCBpdCB3aXRoIG5ld1VTZXJEYXRhLlxuICAgICAgICAgICAgLy9Pbmx5IGlzIHNhdmUgaXMgc3VjY2VzcyBpZGVudGl0eVN2Yy5jdXJyZW50VXNlciB3aWxsIGJlIHVwZGF0ZWQuXG4gICAgICAgICAgICB2YXIgY2xvbmUgPSBhbmd1bGFyLmNvcHkoaWRlbnRpdHlTdmMuY3VycmVudFVzZXIpO1xuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoY2xvbmUsIG5ld1VzZXJEYXRhKTtcblxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgY2xvbmUuJHVwZGF0ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyID0gY2xvbmU7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlc3BvbnNlLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBhdXRob3JpemVDdXJyZW50VXNlckZvclJvdXRlOiAgZnVuY3Rpb24gKHJvbGUpIHtcbiAgICAgICAgICAgIGlmIChpZGVudGl0eVN2Yy5pc0F1dGhvcml6ZWQocm9sZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoJ25vdCBhdXRob3JpemVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXV0aG9yaXplQXV0aGVudGljYXRlZFVzZXJGb3JSb3V0ZTogIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpZGVudGl0eVN2Yy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCgnbm90IGF1dGhvcml6ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBsb2dvdXRVc2VyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBkZWZmZXJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2xvZ291dCcsIHtsb2dvdXQ6IHRydWV9KS50aGVuKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZGVudGl0eVN2Yy5jdXJyZW50VXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgZGVmZmVyZWQucmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmZlcmVkLnByb21pc2U7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZGVudGl0eVN2Yygkd2luZG93LCB1c2VyUmVzb3VyY2UpIHtcblxuICAgIHZhciBjdXJyZW50VXNlcjtcblxuICAgIGlmICghISR3aW5kb3cuY3VycmVudFVzZXIgKSB7XG5cbiAgICAgICAgY3VycmVudFVzZXIgPSBuZXcgdXNlclJlc291cmNlKCk7XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKGN1cnJlbnRVc2VyLCR3aW5kb3cuY3VycmVudFVzZXIpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgY3VycmVudFVzZXI6IGN1cnJlbnRVc2VyLFxuXG4gICAgICAgIGlzQXV0aGVudGljYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRVc2VyO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzQXV0aG9yaXplZDogZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgdGhpcy5jdXJyZW50VXNlci5oYXNSb2xlKHJvbGUpO1xuICAgICAgICB9XG5cblxuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0FwcC5TZXJ2aWNlcycsIFtdKVxuXG4gICAgLy9BY2NvdW50XG4gICAgLmZhY3RvcnkoJ2F1dGhTdmMnLHJlcXVpcmUoJy4vYXV0aFN2YycpKVxuICAgIC5mYWN0b3J5KCdpZGVudGl0eVN2YycscmVxdWlyZSgnLi9pZGVudGl0eVN2YycpKVxuICAgIC5mYWN0b3J5KCdub3RpZmllclN2YycscmVxdWlyZSgnLi9ub3RpZmllclN2YycpKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDMvMjAvMTQuXG4gKi9cbi8vdG9hc3RyIGNvbWVzIGZyb20gdmVuZG9yLm1pbi5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vdGlmaWVyU3ZjKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5vdGlmeTogZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAgICB0b2FzdHIuc3VjY2Vzcyhtc2cpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBlcnJvcjogZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAgICB0b2FzdHIuZXJyb3IobXNnKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzE3LzIwMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICByb2xlczoge1xuXG4gICAgICAgIGFkbWluOiAnYWRtaW4nLFxuICAgICAgICBjb250cmFjdG9yOiAnY29udHJhY3RvcicsXG4gICAgICAgIGN1c3RvbWVyOiAnY3VzdG9tZXInXG5cbiAgICB9LFxuXG4gICAgc2FsdXRhdGlvbjoge1xuXG4gICAgICAgIE1yOiAnTXInLFxuICAgICAgICBNcnM6ICdNcycsXG4gICAgICAgIE1pc3M6ICcnXG5cbiAgICB9LFxuXG4gICAgLy9TaG91bGQgYmUgdHJhbnNsYXRlZFxuICAgIG9yZGVyVHlwZToge1xuICAgICAgICByZXBhaXI6ICdyb29mIHJlcGFpcicsXG4gICAgICAgIGNoZWNrOiAncm9vZiBjaGVjaydcbiAgICB9LFxuXG4gICAgcm9vZlR5cGU6IHtcblxuICAgICAgICBzdGVlcDogJ1N0ZWVwJyxcbiAgICAgICAgZmxhdDogJ0ZsYXQnLFxuICAgICAgICBvdGhlcjogJ090aGVyJ1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0eVR5cGU6IHtcbiAgICAgICAgc2luZ2xlRmFtaWx5OiAnU2luZ2xlIEZhbWlseScsXG4gICAgICAgIG11bHRpRmFtaWx5OiAnTXVsdGkgRmFtaWx5J1xuICAgIH0sXG5cbiAgICBjb250YWN0VHlwZToge1xuICAgICAgICBvd25lcjogJ293bmVyJyxcbiAgICAgICAgcmVudGVyOiAncmVudGVyJyxcbiAgICAgICAgY29uY2llcmdlOiAnY29uY2llcmdlJyxcbiAgICAgICAgcm9vbW1hdGU6ICdyb29tbWF0ZScsXG4gICAgICAgIG5laWdoYm91cjogJ25laWdoYm91cidcbiAgICB9LFxuXG4gICAgZGlzdGFuY2VUeXBlOiB7XG5cbiAgICAgICAga2xtOiAna2lsb21ldGVycycsXG4gICAgICAgIG1pbGVzOiAnbWlsZXMnXG4gICAgfSxcblxuICAgIGpvYlN0YXR1czoge1xuICAgICAgICB1bmtub3duIDogJ3Vua25vd24nLFxuICAgICAgICBjcmVhdGVkOiAnY3JlYXRlZCcsXG4gICAgICAgIHJlcXVlc3RBY2NlcHRlZDogJ3JlcXVlc3QgYWNjZXB0ZWQnLFxuICAgICAgICByZXF1ZXN0UmVqZWN0ZWQ6ICdyZXF1ZXN0IHJlamVjdGVkJyAsXG4gICAgICAgIHdvcmtTdGFydGVkOiAnd29yayBzdGFydGVkJyxcbiAgICAgICAgd29ya0NvbXBsZXRlZDogJ3dvcmsgY29tcGxldGVkJyxcbiAgICAgICAgd29ya1JlamVjdGVkOiAnd29yayByZWplY3RlZCdcbiAgICB9LFxuXG4gICAgcGF5bWVudFR5cGU6IHtcblxuICAgICAgICBjYXNoOidjYXNoJyxcbiAgICAgICAgYmFua1RyYW5zZmVyOiAnYmFuayB0cmFuc2ZlcicsXG4gICAgICAgIGFtZXg6ICdhbWV4JyxcbiAgICAgICAgdmlzYTogJ3Zpc2EnLFxuICAgICAgICBtYXN0ZXJDYXJkOiAnbWFzdGVyIGNhcmQnLFxuICAgICAgICBkaXNjb3ZlckNhcmQ6ICdkaXNjb3ZlciBjYXJkJ1xuXG4gICAgfSxcblxuICAgIFVuaXRPZk1lYXN1cmU6IHtcblxuICAgICAgICBQaWVjZTogJ1BpZWNlJyxcbiAgICAgICAgTWV0ZXI6ICdNZXRlcicsXG4gICAgICAgIEN1YmljTWV0ZXI6ICdDdWJpY01ldGVyJ1xuICAgIH1cblxuXG59OyJdfQ==
