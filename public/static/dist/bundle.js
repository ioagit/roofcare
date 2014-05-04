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
    directives = require('../../public/app/directives'),
    filters = require('../../public/app/filters');


//Main Angular module. Cool
angular.module('app',
                  ['ngResource', 'ngRoute',
                  controllers.name, services.name, app_routes.name, resources.name, directives.name, filters.name]);

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
},{"../../public/app/config/routes.js":4,"../../public/app/controllers":8,"../../public/app/directives":15,"../../public/app/filters":17,"../../public/app/resources":20,"../../public/app/services":25}],"9dpAQ+":[function(require,module,exports){
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
        },

        pagination: {
            limit: 5
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

},{"../../../public/app/lib/router.js":19,"app_config":"9dpAQ+"}],5:[function(require,module,exports){
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

module.exports = function rooferDashboardCtrl($scope, dashboardSvc) {

    $scope.getDashboard = function() {

        $scope.data =  dashboardSvc.dashboard();
        $scope.data.then(function(data) {
            $scope.dashboard = data;
            $scope.nextJob = getNextEvent();
        });

    };

    $scope.onlyToday = function() {
        var todayDay = (new Date).getDate();

        return function (job) {
            var jobDate = new Date(job.StartDate).getDate();
            return jobDate === todayDay;
        };

    }
    //Run
    $scope.getDashboard();

    function getNextEvent() {

        if ($scope.dashboard.length === 0)
            return;

        return $scope.dashboard.comingUp[0];

    }


};


},{}],10:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

var config = require('app_config');

module.exports = function inboxCtrl($scope, inboxSvc) {


    //Init var
    $scope.offset = 0;
    $scope.rows = []
    $scope.totalFound = 0;



    $scope.getLatest = function() {



        $scope.data =  inboxSvc.getLatest({limit: config.pagination.limit, offset: $scope.offset });
        $scope.data.then(function(data) {
            $scope.rows =   $scope.rows.concat(data.rows);
            $scope.totalFound = data.totalFound;
        });

    };

    $scope.loadMore = function() {
        $scope.offset += config.pagination.limit;
        $scope.getLatest();
    };

    $scope.moreAvailable = function() {
        return $scope.totalFound > $scope.offset + config.pagination.limit;
    }

    $scope.getLatest();

}

},{"app_config":"9dpAQ+"}],11:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

var config = require('app_config');

module.exports = function rooferJobCtrl($scope, jobSvc) {


      //Init var
      $scope.offset = 0;
     $scope.rows = []
     $scope.totalFound = 0;



    $scope.getLatest = function() {



        $scope.data =  jobSvc.getLatest({limit: config.pagination.limit, offset: $scope.offset });
        $scope.data.then(function(data) {
            $scope.rows =   $scope.rows.concat(data.rows);
            $scope.totalFound = data.totalFound;
        });

    };

    $scope.loadMore = function() {
        $scope.offset += config.pagination.limit;
         $scope.getLatest();
    };

    $scope.moreAvailable = function() {
        return $scope.totalFound > $scope.offset + config.pagination.limit;
    }

       $scope.getLatest();

}

},{"app_config":"9dpAQ+"}],12:[function(require,module,exports){
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

module.exports = function dashboardJob() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/templates/directives/dashboardJob.html'

    };
}
},{}],15:[function(require,module,exports){
/**
 * Created by isuarez on 4/29/14.
 */

'use strict';



module.exports = angular.module('App.Directives', [])

    .directive('jobStatus',  require('./jobStatus'))
.directive('dashboardJob',  require('./dashboardJob'));


},{"./dashboardJob":14,"./jobStatus":16}],16:[function(require,module,exports){
/**
 * Created by isuarez on 4/29/14.
 */
var lookups = require('../../../server/models/lookups');

module.exports = function jobStatus() {
    return {
        scope: {
            status: '@'
        },
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/templates/directives/jobStatus.html',
        link: function(scope, el, attrs) {


            switch(attrs.status)
            {
                case lookups.jobStatus.workCompleted:
                    scope.labelType = 'primary';
                    break;
                case lookups.jobStatus.requestAccepted:
                    scope.labelType = 'success';
                    break;
                case lookups.jobStatus.workStarted:
                    scope.labelType = 'warning';
                    break;
                case lookups.jobStatus.created:
                    scope.labelType = 'danger';
                    break;
                default:
                    scope.labelType = 'default';
            }


        }

    };
}
},{"../../../server/models/lookups":30}],17:[function(require,module,exports){
/**
 * Created by isuarez on 4/29/14.
 */

'use strict';



module.exports = angular.module('App.Filters', [])

    .filter('todayFilter',  require('./todayFilter'));


},{"./todayFilter":18}],18:[function(require,module,exports){
/**
 * Created by isuarez on 5/3/14.
 */

/**
 * Created by isuarez on 4/29/14.
 */

module.exports = function todayFilter() {

    return function (list, today) {

        var todayDay = Date.getDate();
        var jobDate;

        console.log(list);

        if (angular.isUndefined(list) || list.lenght === 0)
           return list;


            var tempList = [];
            angular.forEach(list, function (item) {
                jobDate = new Date(item.StartDate).getDate();
                if (jobDate === todayDay)
                    tempList.push(item);
            });

        return tempList;

    };

}
},{}],19:[function(require,module,exports){
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


},{}],20:[function(require,module,exports){
'use strict';

module.exports = angular.module('App.Resources', [])

    //Account
    .factory('jobResource',require('./jobResource'))
    .factory('userResource',require('./userResource'));

},{"./jobResource":21,"./userResource":22}],21:[function(require,module,exports){
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
            update: {method: 'PUT', isArray:false},
            list:{isArray:true, method:'get',
                transformResponse: function (data, headers) {
                    return JSON.parse(data);
                }}
        }
    );



    return JobResource;
};

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
'use strict';

module.exports = angular.module('App.Services', [])

    //Account
    .factory('authSvc',require('./authSvc'))
    .factory('identitySvc',require('./identitySvc'))
    .factory('jobSvc',require('./roofer/jobSvc'))
    .factory('inboxSvc',require('./roofer/inboxSvc'))
    .factory('dashboardSvc',require('./roofer/dashboardSvc'))

    .factory('notifierSvc',require('./notifierSvc'));

},{"./authSvc":23,"./identitySvc":24,"./notifierSvc":26,"./roofer/dashboardSvc":27,"./roofer/inboxSvc":28,"./roofer/jobSvc":29}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
/**
 * Created by isuarez on 5/3/14.
 */

module.exports = function dashboardSvc($http, $q) {

    var jobsBaseUrl = '/api/contractor/dashboard/';

    return {

        dashboard: function dashboard() {

            var deferred = $q.defer();


            $http({
                    method: 'GET',
                    url: jobsBaseUrl
                }
            ).success(function (data, status, headers, info) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, info) {
                    deferred.reject(status);
                })

            return deferred.promise;

        }
    }

}
},{}],28:[function(require,module,exports){
/**
 * Created by isuarez on 5/3/14.
 */

module.exports = function inboxSvc($http, $q) {

    var baseUrl = '/api/contractor/inbox/';


    return {



        getLatest: function getLastest(options) {

            var deferred = $q.defer();

            //Getting the services
            $http({
                    method: 'GET',
                    url: baseUrl + '?limit=' + options.limit + '&offset=' + options.offset
                }
            ).success(function (data, status, headers, info) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, info) {
                    deferred.reject(status);
                })

            return deferred.promise;

        }
    }

}
},{}],29:[function(require,module,exports){
/**
 * Created by isuarez on 5/3/14.
 */

module.exports = function jobSvc ($http, $q) {

    var jobsBaseUrl = '/api/contractor/jobs/';


    return {



        getLatest: function getLatest(options) {

            var deferred = $q.defer();


            $http({
                    method: 'GET',
                    url: jobsBaseUrl + '?limit='+ options.limit + '&offset=' + options.offset
                }
            ).success(function (data, status, headers, info) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, info) {
                    deferred.reject(status);
                })

            return deferred.promise;

        }
    }

}
},{}],30:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9hcHAuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbmZpZy9jb25maWcuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL2FjY291bnQvaGVhZGVyTG9naW5DdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9hY2NvdW50L3Byb2ZpbGVDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9hY2NvdW50L3NpZ251cEN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL2luZGV4LmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9yb29mZXIvcm9vZmVyRGFzaGJvYXJkQ3RybC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvY29udHJvbGxlcnMvcm9vZmVyL3Jvb2ZlckluYm94Q3RybC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvY29udHJvbGxlcnMvcm9vZmVyL3Jvb2ZlckpvYkN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL3Jvb2Zlci9yb29mZXJLdW5kZXJDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9yb29mZXIvcm9vZmVyUmVjaG51bmdDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9kaXJlY3RpdmVzL2Rhc2hib2FyZEpvYi5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvZGlyZWN0aXZlcy9pbmRleC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvZGlyZWN0aXZlcy9qb2JTdGF0dXMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2ZpbHRlcnMvaW5kZXguanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2ZpbHRlcnMvdG9kYXlGaWx0ZXIuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2xpYi9yb3V0ZXIuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3Jlc291cmNlcy9pbmRleC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvcmVzb3VyY2VzL2pvYlJlc291cmNlLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9yZXNvdXJjZXMvdXNlclJlc291cmNlLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9zZXJ2aWNlcy9hdXRoU3ZjLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9zZXJ2aWNlcy9pZGVudGl0eVN2Yy5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvc2VydmljZXMvaW5kZXguanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3NlcnZpY2VzL25vdGlmaWVyU3ZjLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9zZXJ2aWNlcy9yb29mZXIvZGFzaGJvYXJkU3ZjLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9zZXJ2aWNlcy9yb29mZXIvaW5ib3hTdmMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3NlcnZpY2VzL3Jvb2Zlci9qb2JTdmMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9zZXJ2ZXIvbW9kZWxzL2xvb2t1cHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAyLzI3LzE0LlxuICovXG5cbi8vV2UgYXJlIGdldHRpbmcgYW5ndWFsciBmcm9tIGNkblxudmFyXG4gICAgYXBwX3JvdXRlcyA9IHJlcXVpcmUoJy4uLy4uL3B1YmxpYy9hcHAvY29uZmlnL3JvdXRlcy5qcycpLFxuICAgIGNvbnRyb2xsZXJzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2FwcC9jb250cm9sbGVycycpLFxuICAgIHNlcnZpY2VzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2FwcC9zZXJ2aWNlcycpLFxuICAgIHJlc291cmNlcyA9IHJlcXVpcmUoJy4uLy4uL3B1YmxpYy9hcHAvcmVzb3VyY2VzJyksXG4gICAgZGlyZWN0aXZlcyA9IHJlcXVpcmUoJy4uLy4uL3B1YmxpYy9hcHAvZGlyZWN0aXZlcycpLFxuICAgIGZpbHRlcnMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvYXBwL2ZpbHRlcnMnKTtcblxuXG4vL01haW4gQW5ndWxhciBtb2R1bGUuIENvb2xcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuICAgICAgICAgICAgICAgICAgWyduZ1Jlc291cmNlJywgJ25nUm91dGUnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlcnMubmFtZSwgc2VydmljZXMubmFtZSwgYXBwX3JvdXRlcy5uYW1lLCByZXNvdXJjZXMubmFtZSwgZGlyZWN0aXZlcy5uYW1lLCBmaWx0ZXJzLm5hbWVdKTtcblxuLy9EZWZpbmluZyBSb3V0ZXNcbi8qXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuXG4gICAgICAgIHZhciByb3V0ZVJvbGVDaGVja3MgPSB7XG5cbiAgICAgICAgICAgIGFkbWluOiB7XG4gICAgICAgICAgICAgICAgYXV0aDogZnVuY3Rpb24ocmNBdXRoU3ZjKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByY0F1dGhTdmMuYXV0aG9yaXplQ3VycmVudFVzZXJGb3JSb3V0ZSgnYWRtaW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgYXV0aDogZnVuY3Rpb24ocmNBdXRoU3ZjKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByY0F1dGhTdmMuYXV0aG9yaXplQXV0aGVudGljYXRlZFVzZXJGb3JSb3V0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgfTtcblxuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG5cbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcblxuICAgICAgICAgICAgLndoZW4oJy8nLCB7dGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvbWFpbi9tYWluJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyY01haW5DdHJsJ30pXG5cbiAgICAgICAgICAgIC53aGVuKCcvYWRtaW4vdXNlcnMnLCB7dGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvYWRtaW4vdXNlci1saXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3JjVXNlckxpc3RDdHJsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmFkbWluXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAud2hlbignL3NpZ251cCcsIHt0ZW1wbGF0ZVVybDogJy9wYXJ0aWFscy9hY2NvdW50L3NpZ251cCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncmNTaWduVXBDdHJsJ30pXG5cbiAgICAgICAgICAgIC53aGVuKCcvcHJvZmlsZScse3RlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL2FjY291bnQvcHJvZmlsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncmNQcm9maWxlQ3RybCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MudXNlciB9KTtcbiAgICB9XG5cbik7XG4qL1xuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkbG9jYXRpb24pXG57XG5cbiAgICAkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlRXJyb3InLCBmdW5jdGlvbihldnQsIGN1cnJlbnQsIHByZXZpb3VzLCByZWplY3Rpb24pIHtcbiAgICAgICAgaWYgKHJlamVjdGlvbiA9PT0gJ25vdCBhdXRob3JpemVkJykge1xuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzIwLzE0LlxuICovXG5cbiB2YXIgYXBwUHJlZml4ID0gJy8nO1xuIHZhciB0ZW1wbGF0ZVVybFByZWZpeCA9ICcvdGVtcGxhdGVzLyc7XG4gdmFyIGFwcFZlcnNpb24gPSAxO1xuXG4gbW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAgICAgdmVyc2lvbiA6IGFwcFZlcnNpb24sXG5cbiAgICAgICAgYmFzZURpcmVjdG9yeSA6IGFwcFByZWZpeCxcbiAgICAgICAgdGVtcGxhdGVEaXJlY3RvcnkgOiB0ZW1wbGF0ZVVybFByZWZpeCxcbiAgICAgICAgdGVtcGxhdGVGaWxlUXVlcnlzdHJpbmcgOiAnP3Y9JyArIGFwcFZlcnNpb24sXG5cbiAgICAgICAgcm91dGluZyA6IHtcblxuICAgICAgICAgICAgcHJlZml4IDogJycsXG4gICAgICAgICAgICBodG1sNU1vZGUgOiB0cnVlXG5cbiAgICAgICAgfSxcblxuICAgICAgICB2aWV3VXJsUHJlZml4IDogdGVtcGxhdGVVcmxQcmVmaXggKyAndmlld3MvJyxcbiAgICAgICAgcGFydGlhbFVybFByZWZpeCA6IHRlbXBsYXRlVXJsUHJlZml4ICsgJ3BhcnRpYWxzLycsXG5cbiAgICAgICAgdGVtcGxhdGVGaWxlU3VmZml4IDogJ190cGwuaHRtbCcsXG5cbiAgICAgICAgcHJlcGFyZVZpZXdUZW1wbGF0ZVVybCA6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlld1VybFByZWZpeCArIHVybCArIHRoaXMudGVtcGxhdGVGaWxlU3VmZml4ICtcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlRmlsZVF1ZXJ5c3RyaW5nO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgIGxpbWl0OiA1XG4gICAgICAgIH1cblxuXG59O1xuXG5cblxuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzkvMTQuXG4gKi9cblxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJ2FwcF9jb25maWcnKTtcbnZhciByb3V0ZXIgPSByZXF1aXJlKCcuLi8uLi8uLi9wdWJsaWMvYXBwL2xpYi9yb3V0ZXIuanMnKTtcblxuXG52YXIgYXBwX3JvdXRlcyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuUm91dGVzJyxbXSk7XG5cbmFwcF9yb3V0ZXMuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLFxuXG4gICAgICAgIGZ1bmN0aW9uICggJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAgICAgICAgIGlmIChjb25maWcucm91dGluZy5odG1sNU1vZGUpIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcm91dGluZ1ByZWZpeCA9IGNvbmZpZy5yb3V0aW5nLnByZWZpeDtcbiAgICAgICAgICAgICAgICBpZiAocm91dGluZ1ByZWZpeCAmJiByb3V0aW5nUHJlZml4Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeChyb3V0aW5nUHJlZml4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfZGFzaGJvYXJkX3BhdGgnLCAnL3Jvb2Zlci9kYXNoYm9hcmQnLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jvb2ZlckRhc2hib2FyZEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb25maWcucHJlcGFyZVZpZXdUZW1wbGF0ZVVybCgncm9vZmVyL2Rhc2hib2FyZCcpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm91dGVyLndoZW4oJ3Jvb2Zlcl9pbmJveF9wYXRoJywgJy9yb29mZXIvaW5ib3gnLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jvb2ZlckluYm94Q3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbmZpZy5wcmVwYXJlVmlld1RlbXBsYXRlVXJsKCdyb29mZXIvaW5ib3gnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfam9ic19wYXRoJywgJy9yb29mZXIvam9icycsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVySm9iQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbmZpZy5wcmVwYXJlVmlld1RlbXBsYXRlVXJsKCdyb29mZXIvam9icycpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm91dGVyLndoZW4oJ3Jvb2Zlcl9rdW5kZW5fcGF0aCcsICcvcm9vZmVyL2t1bmRlbicsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVyS3VuZGVuQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbmZpZy5wcmVwYXJlVmlld1RlbXBsYXRlVXJsKCdyb29mZXIva3VuZGVuJylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3V0ZXIud2hlbigncm9vZmVyX3JlY2hudW5nX3BhdGgnLCAnL3Jvb2Zlci9yZWNobnVuZycsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVyUmVjaG51bmdDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ3Jvb2Zlci9yZWNobnVuZycpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm91dGVyLndoZW4oJ3Jvb2Zlcl9ob21lX3BhdGgnLCAnLycsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVyRGFzaGJvYXJkQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbmZpZy5wcmVwYXJlVmlld1RlbXBsYXRlVXJsKCdyb29mZXIvZGFzaGJvYXJkJylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3V0ZXIuYWxpYXMoJ2hvbWVfcGF0aCcsICdyb29mZXJfZGFzaGJvYXJkX3BhdGgnKTtcblxuICAgICAgICAgICAgcm91dGVyLm90aGVyd2lzZSh7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogJy9yb29mZXIvZGFzaGJvYXJkJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci5pbnN0YWxsKCRyb3V0ZVByb3ZpZGVyKTtcbiAgICAgICAgfV0pO1xuXG5hcHBfcm91dGVzLnJ1bihbICckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uICggJHJvb3RTY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciBwcmVmaXggPSAnJztcbiAgICAgICAgaWYgKCFjb25maWcucm91dGluZy5odG1sNU1vZGUpIHtcbiAgICAgICAgICAgIHByZWZpeCA9ICcjJyArIGNvbmZpZy5yb3V0aW5nLnByZWZpeDtcbiAgICAgICAgfVxuICAgICAgICAkcm9vdFNjb3BlLnJvdXRlID0gZnVuY3Rpb24gKHVybCwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIHByZWZpeCArIHJvdXRlci5yb3V0ZVBhdGgodXJsLCBhcmdzKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkcm9vdFNjb3BlLnIgPSAkcm9vdFNjb3BlLnJvdXRlO1xuXG4gICAgICAgICRyb290U2NvcGUuYyA9IGZ1bmN0aW9uIChyb3V0ZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciB1cmwgPSByb3V0ZXIucm91dGVQYXRoKHJvdXRlKTtcbiAgICAgICAgICAgIGlmICh1cmwgPT09ICRsb2NhdGlvbi5wYXRoKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfV0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcF9yb3V0ZXM7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICBmdW5jdGlvbiBoZWFkZXJMb2dpbkN0cmwoJHNjb3BlLCAkaHR0cCwgbm90aWZpZXJTdmMsIGlkZW50aXR5U3ZjLCBhdXRoU3ZjLCAkbG9jYXRpb24pIHtcblxuICAgICRzY29wZS5pZGVudGl0eSA9IGlkZW50aXR5U3ZjO1xuICAgICRzY29wZS5zaWduaW4gPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG5cbiAgICAgICAgYXV0aFN2Yy5hdXRoZW50aWNhdGVVc2VyKHVzZXJuYW1lLCBwYXNzd29yZCkudGhlbihmdW5jdGlvbihzdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5ub3RpZnkoJ1N1Y2Nlc3MgTG9naW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5ub3RpZnkoJ0Vycm9yIGxvZ2luIGluLicpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cblxuICAgICAgICAkc2NvcGUuc2lnbm91dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBhdXRoU3ZjLmxvZ291dFVzZXIoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS51c2VybmFtZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnBhc3N3b3JkID0gXCJcIjtcbiAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5ub3RpZnkoJ1lvdSBoYXZlIGJlZW4gc3VjY2Vzc2Z5bGx5IHNpZ25lIG91dCcpO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL1wiKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cblxufTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cbi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDMvMjkvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcm9maWxlQ3RybCgkc2NvcGUsIGF1dGhTdmMsIGlkZW50aXR5U3ZjLCBub3RpZmllclN2Yykge1xuXG4gICAgLy9Bc3NpbmcgdGhlIGRhdGFcbiAgICB2YXIgdXNlciA9IGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyO1xuICAgICRzY29wZS5lbWFpbCA9IHVzZXIudXNlcm5hbWU7XG4gICAgJHNjb3BlLmZuYW1lID0gdXNlci5maXJzdE5hbWU7XG4gICAgJHNjb3BlLmxuYW1lID0gdXNlci5sYXN0TmFtZTtcblxuXG4gICAgLy9VcGRhdGVcbiAgICAkc2NvcGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIG5ld1VzZXJEYXRhICA9ICB7XG4gICAgICAgICAgICB1c2VybmFtZTogJHNjb3BlLmVtYWlsLFxuICAgICAgICAgICAgZmlyc3ROYW1lOiAkc2NvcGUuZm5hbWUsXG4gICAgICAgICAgICBsYXN0TmFtZTogJHNjb3BlLmxuYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCRzY29wZS5wYXNzd29yZCAmJiAkc2NvcGUucGFzc3dvcmQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5wYXNzd29yZDtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy9DYWxsIHRoZSByY0F1dGggU2VydmljZVxuICAgICAgICBhdXRoU3ZjLnVwZGF0ZUN1cnJlbnRVc2VyKG5ld1VzZXJEYXRhKS50aGVuKFxuICAgICAgICAgICAgLy9TdWNjZXNzXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpZXJTdmMubm90aWZ5KCdVc2VyIEFjY291bnQgaGFzIGJlZW4gdXBkYXRlZCEnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvL0ZhaWxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIG5vdGlmaWVyU3ZjLmVycm9yKHJlYXNvbik7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMy8yNy8xNC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAgZnVuY3Rpb24gc2lnbnVwQ3RybCgkc2NvcGUsIGF1dGhTdmMsIG5vdGlmaWVyU3ZjLCAkbG9jYXRpb24pIHtcblxuICAgICRzY29wZS5zaWdudXAgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAvL0NyZWF0ZSB0aGUgbmV3IFVzZXJEYXRhIG9iamVjdFxuICAgICAgICB2YXIgbmV3VXNlckRhdGEgID0gIHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiAkc2NvcGUuZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkLFxuICAgICAgICAgICAgZmlyc3ROYW1lOiAkc2NvcGUuZm5hbWUsXG4gICAgICAgICAgICBsYXN0TmFtZTogJHNjb3BlLmxuYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgLy9DYWxsIHRoZSByY0F1dGggU2VydmljZVxuICAgICAgICBhdXRoU3ZjLmNyZWF0ZVVzZXIobmV3VXNlckRhdGEpLnRoZW4oXG4gICAgICAgICAgICAvL1N1Y2Nlc3NcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5ub3RpZnkoJ1VzZXIgQWNjb3VudCBDcmVhdGVkIScpO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy9GYWlsXG4gICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5lcnJvcihyZWFzb24pO1xuICAgICAgICAgICAgfSk7O1xuXG4gICAgICAgIC8vRW5kIFNpZ251cCBGdW5jdGlvblxuICAgIH07XG5cblxuXG5cblxuXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnQXBwLkNvbnRyb2xsZXJzJywgW10pXG5cbiAgICAvL0FjY291bnRcbiAgICAvLy5jb250cm9sbGVyKCdwcm9maWxlQ3RybCcsICByZXF1aXJlKG5wYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3B1YmxpYycsICdhcHAnLCAnY29udHJvbGxlcnMnLCAnYWNjb3VudCcsJ3Byb2ZpbGVDdHJsJykpKVxuICAgIC5jb250cm9sbGVyKCdwcm9maWxlQ3RybCcsICByZXF1aXJlKCcuL2FjY291bnQvcHJvZmlsZUN0cmwnKSlcbiAgICAuY29udHJvbGxlcignaGVhZGVyTG9naW5DdHJsJywgcmVxdWlyZSgnLi9hY2NvdW50L2hlYWRlckxvZ2luQ3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdzaWdudXBDdHJsJywgcmVxdWlyZSgnLi9hY2NvdW50L3NpZ251cEN0cmwnKSlcblxuICAgIC8vQWRtaW5cblxuICAgIC8vcm9vZmVyXG4gICAgLmNvbnRyb2xsZXIoJ3Jvb2ZlckRhc2hib2FyZEN0cmwnLHJlcXVpcmUoJy4vcm9vZmVyL3Jvb2ZlckRhc2hib2FyZEN0cmwnKSlcbiAgICAuY29udHJvbGxlcigncm9vZmVySW5ib3hDdHJsJyxyZXF1aXJlKCcuL3Jvb2Zlci9yb29mZXJJbmJveEN0cmwnKSlcbiAgICAuY29udHJvbGxlcigncm9vZmVySm9iQ3RybCcscmVxdWlyZSgnLi9yb29mZXIvcm9vZmVySm9iQ3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdyb29mZXJLdW5kZXJDdHJsJyxyZXF1aXJlKCcuL3Jvb2Zlci9yb29mZXJLdW5kZXJDdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ3Jvb2ZlclJlY2hudW5nQ3RybCcscmVxdWlyZSgnLi9yb29mZXIvcm9vZmVyUmVjaG51bmdDdHJsJykpO1xuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAyLzMvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb29mZXJEYXNoYm9hcmRDdHJsKCRzY29wZSwgZGFzaGJvYXJkU3ZjKSB7XG5cbiAgICAkc2NvcGUuZ2V0RGFzaGJvYXJkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSAgZGFzaGJvYXJkU3ZjLmRhc2hib2FyZCgpO1xuICAgICAgICAkc2NvcGUuZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXNoYm9hcmQgPSBkYXRhO1xuICAgICAgICAgICAgJHNjb3BlLm5leHRKb2IgPSBnZXROZXh0RXZlbnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJHNjb3BlLm9ubHlUb2RheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdG9kYXlEYXkgPSAobmV3IERhdGUpLmdldERhdGUoKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGpvYikge1xuICAgICAgICAgICAgdmFyIGpvYkRhdGUgPSBuZXcgRGF0ZShqb2IuU3RhcnREYXRlKS5nZXREYXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gam9iRGF0ZSA9PT0gdG9kYXlEYXk7XG4gICAgICAgIH07XG5cbiAgICB9XG4gICAgLy9SdW5cbiAgICAkc2NvcGUuZ2V0RGFzaGJvYXJkKCk7XG5cbiAgICBmdW5jdGlvbiBnZXROZXh0RXZlbnQoKSB7XG5cbiAgICAgICAgaWYgKCRzY29wZS5kYXNoYm9hcmQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHJldHVybiAkc2NvcGUuZGFzaGJvYXJkLmNvbWluZ1VwWzBdO1xuXG4gICAgfVxuXG5cbn07XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnYXBwX2NvbmZpZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluYm94Q3RybCgkc2NvcGUsIGluYm94U3ZjKSB7XG5cblxuICAgIC8vSW5pdCB2YXJcbiAgICAkc2NvcGUub2Zmc2V0ID0gMDtcbiAgICAkc2NvcGUucm93cyA9IFtdXG4gICAgJHNjb3BlLnRvdGFsRm91bmQgPSAwO1xuXG5cblxuICAgICRzY29wZS5nZXRMYXRlc3QgPSBmdW5jdGlvbigpIHtcblxuXG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSAgaW5ib3hTdmMuZ2V0TGF0ZXN0KHtsaW1pdDogY29uZmlnLnBhZ2luYXRpb24ubGltaXQsIG9mZnNldDogJHNjb3BlLm9mZnNldCB9KTtcbiAgICAgICAgJHNjb3BlLmRhdGEudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAkc2NvcGUucm93cyA9ICAgJHNjb3BlLnJvd3MuY29uY2F0KGRhdGEucm93cyk7XG4gICAgICAgICAgICAkc2NvcGUudG90YWxGb3VuZCA9IGRhdGEudG90YWxGb3VuZDtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJHNjb3BlLmxvYWRNb3JlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5vZmZzZXQgKz0gY29uZmlnLnBhZ2luYXRpb24ubGltaXQ7XG4gICAgICAgICRzY29wZS5nZXRMYXRlc3QoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm1vcmVBdmFpbGFibGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRzY29wZS50b3RhbEZvdW5kID4gJHNjb3BlLm9mZnNldCArIGNvbmZpZy5wYWdpbmF0aW9uLmxpbWl0O1xuICAgIH1cblxuICAgICRzY29wZS5nZXRMYXRlc3QoKTtcblxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMi8zLzE0LlxuICovXG5cbnZhciBjb25maWcgPSByZXF1aXJlKCdhcHBfY29uZmlnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm9vZmVySm9iQ3RybCgkc2NvcGUsIGpvYlN2Yykge1xuXG5cbiAgICAgIC8vSW5pdCB2YXJcbiAgICAgICRzY29wZS5vZmZzZXQgPSAwO1xuICAgICAkc2NvcGUucm93cyA9IFtdXG4gICAgICRzY29wZS50b3RhbEZvdW5kID0gMDtcblxuXG5cbiAgICAkc2NvcGUuZ2V0TGF0ZXN0ID0gZnVuY3Rpb24oKSB7XG5cblxuXG4gICAgICAgICRzY29wZS5kYXRhID0gIGpvYlN2Yy5nZXRMYXRlc3Qoe2xpbWl0OiBjb25maWcucGFnaW5hdGlvbi5saW1pdCwgb2Zmc2V0OiAkc2NvcGUub2Zmc2V0IH0pO1xuICAgICAgICAkc2NvcGUuZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICRzY29wZS5yb3dzID0gICAkc2NvcGUucm93cy5jb25jYXQoZGF0YS5yb3dzKTtcbiAgICAgICAgICAgICRzY29wZS50b3RhbEZvdW5kID0gZGF0YS50b3RhbEZvdW5kO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkc2NvcGUubG9hZE1vcmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLm9mZnNldCArPSBjb25maWcucGFnaW5hdGlvbi5saW1pdDtcbiAgICAgICAgICRzY29wZS5nZXRMYXRlc3QoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm1vcmVBdmFpbGFibGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRzY29wZS50b3RhbEZvdW5kID4gJHNjb3BlLm9mZnNldCArIGNvbmZpZy5wYWdpbmF0aW9uLmxpbWl0O1xuICAgIH1cblxuICAgICAgICRzY29wZS5nZXRMYXRlc3QoKTtcblxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMi8zLzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm9vZmVyS3VuZGVuQ3RybCgkc2NvcGUpIHtcblxuICAgIC8vVE9ETztcblxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMi8zLzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm9vZmVyUmVjaG51bmdDdHJsKCRzY29wZSkge1xuXG4gIC8vVE9ETztcblxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8yOS8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRhc2hib2FyZEpvYigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgICAgcmVwbGFjZTogJ3RydWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy90ZW1wbGF0ZXMvZGlyZWN0aXZlcy9kYXNoYm9hcmRKb2IuaHRtbCdcblxuICAgIH07XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8yOS8xNC5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuRGlyZWN0aXZlcycsIFtdKVxuXG4gICAgLmRpcmVjdGl2ZSgnam9iU3RhdHVzJywgIHJlcXVpcmUoJy4vam9iU3RhdHVzJykpXG4uZGlyZWN0aXZlKCdkYXNoYm9hcmRKb2InLCAgcmVxdWlyZSgnLi9kYXNoYm9hcmRKb2InKSk7XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMjkvMTQuXG4gKi9cbnZhciBsb29rdXBzID0gcmVxdWlyZSgnLi4vLi4vLi4vc2VydmVyL21vZGVscy9sb29rdXBzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gam9iU3RhdHVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBzdGF0dXM6ICdAJ1xuICAgICAgICB9LFxuICAgICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgICAgcmVwbGFjZTogJ3RydWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy90ZW1wbGF0ZXMvZGlyZWN0aXZlcy9qb2JTdGF0dXMuaHRtbCcsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cnMpIHtcblxuXG4gICAgICAgICAgICBzd2l0Y2goYXR0cnMuc3RhdHVzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhc2UgbG9va3Vwcy5qb2JTdGF0dXMud29ya0NvbXBsZXRlZDpcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubGFiZWxUeXBlID0gJ3ByaW1hcnknO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGxvb2t1cHMuam9iU3RhdHVzLnJlcXVlc3RBY2NlcHRlZDpcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubGFiZWxUeXBlID0gJ3N1Y2Nlc3MnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGxvb2t1cHMuam9iU3RhdHVzLndvcmtTdGFydGVkOlxuICAgICAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFR5cGUgPSAnd2FybmluZyc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgbG9va3Vwcy5qb2JTdGF0dXMuY3JlYXRlZDpcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubGFiZWxUeXBlID0gJ2Rhbmdlcic7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmxhYmVsVHlwZSA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgIH07XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8yOS8xNC5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuRmlsdGVycycsIFtdKVxuXG4gICAgLmZpbHRlcigndG9kYXlGaWx0ZXInLCAgcmVxdWlyZSgnLi90b2RheUZpbHRlcicpKTtcblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNS8zLzE0LlxuICovXG5cbi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMjkvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0b2RheUZpbHRlcigpIHtcblxuICAgIHJldHVybiBmdW5jdGlvbiAobGlzdCwgdG9kYXkpIHtcblxuICAgICAgICB2YXIgdG9kYXlEYXkgPSBEYXRlLmdldERhdGUoKTtcbiAgICAgICAgdmFyIGpvYkRhdGU7XG5cbiAgICAgICAgY29uc29sZS5sb2cobGlzdCk7XG5cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQobGlzdCkgfHwgbGlzdC5sZW5naHQgPT09IDApXG4gICAgICAgICAgIHJldHVybiBsaXN0O1xuXG5cbiAgICAgICAgICAgIHZhciB0ZW1wTGlzdCA9IFtdO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGxpc3QsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgam9iRGF0ZSA9IG5ldyBEYXRlKGl0ZW0uU3RhcnREYXRlKS5nZXREYXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGpvYkRhdGUgPT09IHRvZGF5RGF5KVxuICAgICAgICAgICAgICAgICAgICB0ZW1wTGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRlbXBMaXN0O1xuXG4gICAgfTtcblxufSIsIiAgICB2YXIgbG9va3VwID0ge307XG4gICAgdmFyIG90aGVyd2lzZUxvb2t1cCA9IG51bGw7XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgICAgICB3aGVuIDogZnVuY3Rpb24oa2V5LCB1cmwsIHBhcmFtcykge1xuICAgICAgICAgICAgbG9va3VwW2tleV0gPSB7XG4gICAgICAgICAgICAgICAgdXJsIDogdXJsLFxuICAgICAgICAgICAgICAgIHBhcmFtcyA6IHBhcmFtc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICBhbGlhcyA6IGZ1bmN0aW9uKGtleTEsIGtleTIpIHtcbiAgICAgICAgICAgIGxvb2t1cFtrZXkxXSA9IGxvb2t1cFtrZXkyXTtcbiAgICAgICAgfSxcblxuICAgICAgICBvdGhlcndpc2UgOiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgICAgIG90aGVyd2lzZUxvb2t1cCA9IHBhcmFtcztcbiAgICAgICAgfSxcblxuICAgICAgICByZXBsYWNlVXJsUGFyYW1zIDogZnVuY3Rpb24odXJsLCBwYXJhbXMpIHtcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IHBhcmFtc1trXTtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgnOicrayx2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcm91dGVEZWZpbmVkIDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gISEgdGhpcy5nZXRSb3V0ZShrZXkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFJvdXRlIDogZnVuY3Rpb24oa2V5LCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9va3VwW2tleV07XG4gICAgICAgIH0sXG5cbiAgICAgICAgcm91dGVQYXRoIDogZnVuY3Rpb24oa2V5LCBhcmdzKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gdGhpcy5nZXRSb3V0ZShrZXkpO1xuICAgICAgICAgICAgdXJsID0gdXJsID8gdXJsLnVybCA6IG51bGw7XG4gICAgICAgICAgICBpZih1cmwgJiYgYXJncykge1xuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMucmVwbGFjZVVybFBhcmFtcyh1cmwsIGFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5zdGFsbCA6IGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBsb29rdXApIHtcbiAgICAgICAgICAgICAgICB2YXIgcm91dGUgPSBsb29rdXBba2V5XTtcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gcm91dGVbJ3VybCddO1xuICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSByb3V0ZVsncGFyYW1zJ107XG4gICAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXIud2hlbih1cmwsIHBhcmFtcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYob3RoZXJ3aXNlTG9va3VwKSB7XG4gICAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXIub3RoZXJ3aXNlKG90aGVyd2lzZUxvb2t1cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0FwcC5SZXNvdXJjZXMnLCBbXSlcblxuICAgIC8vQWNjb3VudFxuICAgIC5mYWN0b3J5KCdqb2JSZXNvdXJjZScscmVxdWlyZSgnLi9qb2JSZXNvdXJjZScpKVxuICAgIC5mYWN0b3J5KCd1c2VyUmVzb3VyY2UnLHJlcXVpcmUoJy4vdXNlclJlc291cmNlJykpO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8yMC8xNC5cbiAqL1xuXG4vKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMy8yNS8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGpvYlJlc291cmNlKCRyZXNvdXJjZSkge1xuXG4gICAgdmFyIEpvYlJlc291cmNlID0gJHJlc291cmNlKCcvYXBpL2NvbnRyYWN0b3Ivam9icy86aWQnLCB7X2lkOiAnQGlkJ30sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVwZGF0ZToge21ldGhvZDogJ1BVVCcsIGlzQXJyYXk6ZmFsc2V9LFxuICAgICAgICAgICAgbGlzdDp7aXNBcnJheTp0cnVlLCBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtUmVzcG9uc2U6IGZ1bmN0aW9uIChkYXRhLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgIH1cbiAgICApO1xuXG5cblxuICAgIHJldHVybiBKb2JSZXNvdXJjZTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMy8yNS8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHVzZXJSZXNvdXJjZSgkcmVzb3VyY2UpIHtcblxuICAgIHZhciBVc2VyUmVzb3VyY2UgPSAkcmVzb3VyY2UoJy9hcGkvdXNlcnMvOmlkJywge19pZDogXCJAaWRcIn0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVwZGF0ZToge21ldGhvZDogJ1BVVCcsIGlzQXJyYXk6ZmFsc2V9XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgVXNlclJlc291cmNlLnByb3RvdHlwZS5pc0FkbWluID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb2xlcyAmJiB0aGlzLmhhc1JvbGUoJ2FkbWluJyk7XG4gICAgfTtcblxuICAgIFVzZXJSZXNvdXJjZS5wcm90b3R5cGUuaXNDb250cmFjdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVzICYmIHRoaXMuaGFzUm9sZSgnY29udHJhY3RvcicpO1xuICAgIH07XG5cbiAgICBVc2VyUmVzb3VyY2UucHJvdG90eXBlLmhhc1JvbGUgPSBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVzLmluZGV4T2Yocm9sZSkgPiAtMTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFVzZXJSZXNvdXJjZTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAzLzIwLzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXV0aFN2YyAgKCRodHRwLCBpZGVudGl0eVN2YywgJHEsIHVzZXJSZXNvdXJjZSkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBhdXRoZW50aWNhdGVVc2VyOiBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2xvZ2luJywge3VzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgdXNlclJlc291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmV4dGVuZCh1c2VyLCByZXNwb25zZS5kYXRhLnVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlTdmMuY3VycmVudFVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0sXG5cblxuICAgICAgICBjcmVhdGVVc2VyOiBmdW5jdGlvbihuZXdVc2VyRGF0YSkge1xuXG4gICAgICAgICAgICB2YXIgdXNlciA9IG5ldyB1c2VyUmVzb3VyY2UobmV3VXNlckRhdGEpO1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgdXNlci4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyID0gdXNlcjtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVzcG9uc2UuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9LFxuXG5cbiAgICAgICAgdXBkYXRlQ3VycmVudFVzZXI6IGZ1bmN0aW9uKG5ld1VzZXJEYXRhKSB7XG5cbiAgICAgICAgICAgIC8vY2xvbmluZyB0aGUgY3VycmVudCB1c2VyIGluIG9yZGVyIHRvIGV4dGVuZCBpdCB3aXRoIG5ld1VTZXJEYXRhLlxuICAgICAgICAgICAgLy9Pbmx5IGlzIHNhdmUgaXMgc3VjY2VzcyBpZGVudGl0eVN2Yy5jdXJyZW50VXNlciB3aWxsIGJlIHVwZGF0ZWQuXG4gICAgICAgICAgICB2YXIgY2xvbmUgPSBhbmd1bGFyLmNvcHkoaWRlbnRpdHlTdmMuY3VycmVudFVzZXIpO1xuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoY2xvbmUsIG5ld1VzZXJEYXRhKTtcblxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgY2xvbmUuJHVwZGF0ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyID0gY2xvbmU7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlc3BvbnNlLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBhdXRob3JpemVDdXJyZW50VXNlckZvclJvdXRlOiAgZnVuY3Rpb24gKHJvbGUpIHtcbiAgICAgICAgICAgIGlmIChpZGVudGl0eVN2Yy5pc0F1dGhvcml6ZWQocm9sZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoJ25vdCBhdXRob3JpemVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXV0aG9yaXplQXV0aGVudGljYXRlZFVzZXJGb3JSb3V0ZTogIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpZGVudGl0eVN2Yy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCgnbm90IGF1dGhvcml6ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBsb2dvdXRVc2VyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBkZWZmZXJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2xvZ291dCcsIHtsb2dvdXQ6IHRydWV9KS50aGVuKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZGVudGl0eVN2Yy5jdXJyZW50VXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgZGVmZmVyZWQucmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmZlcmVkLnByb21pc2U7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZGVudGl0eVN2Yygkd2luZG93LCB1c2VyUmVzb3VyY2UpIHtcblxuICAgIHZhciBjdXJyZW50VXNlcjtcblxuICAgIGlmICghISR3aW5kb3cuY3VycmVudFVzZXIgKSB7XG5cbiAgICAgICAgY3VycmVudFVzZXIgPSBuZXcgdXNlclJlc291cmNlKCk7XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKGN1cnJlbnRVc2VyLCR3aW5kb3cuY3VycmVudFVzZXIpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgY3VycmVudFVzZXI6IGN1cnJlbnRVc2VyLFxuXG4gICAgICAgIGlzQXV0aGVudGljYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRVc2VyO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzQXV0aG9yaXplZDogZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgdGhpcy5jdXJyZW50VXNlci5oYXNSb2xlKHJvbGUpO1xuICAgICAgICB9XG5cblxuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0FwcC5TZXJ2aWNlcycsIFtdKVxuXG4gICAgLy9BY2NvdW50XG4gICAgLmZhY3RvcnkoJ2F1dGhTdmMnLHJlcXVpcmUoJy4vYXV0aFN2YycpKVxuICAgIC5mYWN0b3J5KCdpZGVudGl0eVN2YycscmVxdWlyZSgnLi9pZGVudGl0eVN2YycpKVxuICAgIC5mYWN0b3J5KCdqb2JTdmMnLHJlcXVpcmUoJy4vcm9vZmVyL2pvYlN2YycpKVxuICAgIC5mYWN0b3J5KCdpbmJveFN2YycscmVxdWlyZSgnLi9yb29mZXIvaW5ib3hTdmMnKSlcbiAgICAuZmFjdG9yeSgnZGFzaGJvYXJkU3ZjJyxyZXF1aXJlKCcuL3Jvb2Zlci9kYXNoYm9hcmRTdmMnKSlcblxuICAgIC5mYWN0b3J5KCdub3RpZmllclN2YycscmVxdWlyZSgnLi9ub3RpZmllclN2YycpKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDMvMjAvMTQuXG4gKi9cbi8vdG9hc3RyIGNvbWVzIGZyb20gdmVuZG9yLm1pbi5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vdGlmaWVyU3ZjKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5vdGlmeTogZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAgICB0b2FzdHIuc3VjY2Vzcyhtc2cpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBlcnJvcjogZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAgICB0b2FzdHIuZXJyb3IobXNnKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA1LzMvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkYXNoYm9hcmRTdmMoJGh0dHAsICRxKSB7XG5cbiAgICB2YXIgam9ic0Jhc2VVcmwgPSAnL2FwaS9jb250cmFjdG9yL2Rhc2hib2FyZC8nO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBkYXNoYm9hcmQ6IGZ1bmN0aW9uIGRhc2hib2FyZCgpIHtcblxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuXG4gICAgICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogam9ic0Jhc2VVcmxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLnN1Y2Nlc3MoZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgaGVhZGVycywgaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgfVxuICAgIH1cblxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDUvMy8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluYm94U3ZjKCRodHRwLCAkcSkge1xuXG4gICAgdmFyIGJhc2VVcmwgPSAnL2FwaS9jb250cmFjdG9yL2luYm94Lyc7XG5cblxuICAgIHJldHVybiB7XG5cblxuXG4gICAgICAgIGdldExhdGVzdDogZnVuY3Rpb24gZ2V0TGFzdGVzdChvcHRpb25zKSB7XG5cbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIC8vR2V0dGluZyB0aGUgc2VydmljZXNcbiAgICAgICAgICAgICRodHRwKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBiYXNlVXJsICsgJz9saW1pdD0nICsgb3B0aW9ucy5saW1pdCArICcmb2Zmc2V0PScgKyBvcHRpb25zLm9mZnNldFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBpbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgaGVhZGVycywgaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoc3RhdHVzKTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblxuICAgICAgICB9XG4gICAgfVxuXG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNS8zLzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gam9iU3ZjICgkaHR0cCwgJHEpIHtcblxuICAgIHZhciBqb2JzQmFzZVVybCA9ICcvYXBpL2NvbnRyYWN0b3Ivam9icy8nO1xuXG5cbiAgICByZXR1cm4ge1xuXG5cblxuICAgICAgICBnZXRMYXRlc3Q6IGZ1bmN0aW9uIGdldExhdGVzdChvcHRpb25zKSB7XG5cbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cblxuICAgICAgICAgICAgJGh0dHAoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGpvYnNCYXNlVXJsICsgJz9saW1pdD0nKyBvcHRpb25zLmxpbWl0ICsgJyZvZmZzZXQ9JyArIG9wdGlvbnMub2Zmc2V0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KS5lcnJvcihmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBpbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChzdGF0dXMpO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzE3LzIwMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICByb2xlczoge1xuXG4gICAgICAgIGFkbWluOiAnYWRtaW4nLFxuICAgICAgICBjb250cmFjdG9yOiAnY29udHJhY3RvcicsXG4gICAgICAgIGN1c3RvbWVyOiAnY3VzdG9tZXInXG5cbiAgICB9LFxuXG4gICAgc2FsdXRhdGlvbjoge1xuXG4gICAgICAgIE1yOiAnTXInLFxuICAgICAgICBNcnM6ICdNcycsXG4gICAgICAgIE1pc3M6ICcnXG5cbiAgICB9LFxuXG4gICAgLy9TaG91bGQgYmUgdHJhbnNsYXRlZFxuICAgIG9yZGVyVHlwZToge1xuICAgICAgICByZXBhaXI6ICdyb29mIHJlcGFpcicsXG4gICAgICAgIGNoZWNrOiAncm9vZiBjaGVjaydcbiAgICB9LFxuXG4gICAgcm9vZlR5cGU6IHtcblxuICAgICAgICBzdGVlcDogJ1N0ZWVwJyxcbiAgICAgICAgZmxhdDogJ0ZsYXQnLFxuICAgICAgICBvdGhlcjogJ090aGVyJ1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0eVR5cGU6IHtcbiAgICAgICAgc2luZ2xlRmFtaWx5OiAnU2luZ2xlIEZhbWlseScsXG4gICAgICAgIG11bHRpRmFtaWx5OiAnTXVsdGkgRmFtaWx5J1xuICAgIH0sXG5cbiAgICBjb250YWN0VHlwZToge1xuICAgICAgICBvd25lcjogJ293bmVyJyxcbiAgICAgICAgcmVudGVyOiAncmVudGVyJyxcbiAgICAgICAgY29uY2llcmdlOiAnY29uY2llcmdlJyxcbiAgICAgICAgcm9vbW1hdGU6ICdyb29tbWF0ZScsXG4gICAgICAgIG5laWdoYm91cjogJ25laWdoYm91cidcbiAgICB9LFxuXG4gICAgZGlzdGFuY2VUeXBlOiB7XG5cbiAgICAgICAga2xtOiAna2lsb21ldGVycycsXG4gICAgICAgIG1pbGVzOiAnbWlsZXMnXG4gICAgfSxcblxuICAgIGpvYlN0YXR1czoge1xuICAgICAgICB1bmtub3duIDogJ3Vua25vd24nLFxuICAgICAgICBjcmVhdGVkOiAnY3JlYXRlZCcsXG4gICAgICAgIHJlcXVlc3RBY2NlcHRlZDogJ3JlcXVlc3QgYWNjZXB0ZWQnLFxuICAgICAgICByZXF1ZXN0UmVqZWN0ZWQ6ICdyZXF1ZXN0IHJlamVjdGVkJyAsXG4gICAgICAgIHdvcmtTdGFydGVkOiAnd29yayBzdGFydGVkJyxcbiAgICAgICAgd29ya0NvbXBsZXRlZDogJ3dvcmsgY29tcGxldGVkJyxcbiAgICAgICAgd29ya1JlamVjdGVkOiAnd29yayByZWplY3RlZCdcbiAgICB9LFxuXG4gICAgcGF5bWVudFR5cGU6IHtcblxuICAgICAgICBjYXNoOidjYXNoJyxcbiAgICAgICAgYmFua1RyYW5zZmVyOiAnYmFuayB0cmFuc2ZlcicsXG4gICAgICAgIGFtZXg6ICdhbWV4JyxcbiAgICAgICAgdmlzYTogJ3Zpc2EnLFxuICAgICAgICBtYXN0ZXJDYXJkOiAnbWFzdGVyIGNhcmQnLFxuICAgICAgICBkaXNjb3ZlckNhcmQ6ICdkaXNjb3ZlciBjYXJkJ1xuXG4gICAgfSxcblxuICAgIFVuaXRPZk1lYXN1cmU6IHtcblxuICAgICAgICBQaWVjZTogJ1BpZWNlJyxcbiAgICAgICAgTWV0ZXI6ICdNZXRlcicsXG4gICAgICAgIEN1YmljTWV0ZXI6ICdDdWJpY01ldGVyJ1xuICAgIH1cblxuXG59OyJdfQ==
