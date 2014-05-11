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


angular.module('app').run(function($rootScope, $location)
{

    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });

});
},{"../../public/app/config/routes.js":4,"../../public/app/controllers":8,"../../public/app/directives":16,"../../public/app/filters":19,"../../public/app/resources":21,"../../public/app/services":26}],"9dpAQ+":[function(require,module,exports){
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

            /* ************************************
            ********   Main Site Routes *************
            ************************************** */

            /*
            router.when('main_order_start', '/order_start', {
                controller: 'mainOrderStart',
                templateUrl: config.prepareViewTemplateUrl('main/order_start')
            });
            */

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

            router.when('roofer_jobs_path', '/roofer/job_start/:id', {
                controller: 'rooferJobStartCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/job_start')
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

},{"../../../public/app/lib/router.js":20,"app_config":"9dpAQ+"}],5:[function(require,module,exports){
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
    .controller('rooferJobStartCtrl',require('./roofer/rooferJobStartCtrl'))
    .controller('rooferKunderCtrl',require('./roofer/rooferKunderCtrl'))
    .controller('rooferRechnungCtrl',require('./roofer/rooferRechnungCtrl'));


},{"./account/headerLoginCtrl":5,"./account/profileCtrl":6,"./account/signupCtrl":7,"./roofer/rooferDashboardCtrl":9,"./roofer/rooferInboxCtrl":10,"./roofer/rooferJobCtrl":11,"./roofer/rooferJobStartCtrl":12,"./roofer/rooferKunderCtrl":13,"./roofer/rooferRechnungCtrl":14}],9:[function(require,module,exports){
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

var config = require('app_config');

module.exports = function rooferJobStartCtrl($scope, $routeParams, jobSvc) {


      //Init var

    $scope.getJob = function getJob() {



        $scope.data =  jobSvc.getJob($routeParams.id);
        $scope.data.then(function(data) {
            $scope.job =   data;
        });

    };



       $scope.getJob();

}

},{"app_config":"9dpAQ+"}],13:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

module.exports = function rooferKundenCtrl($scope) {

    //TODO;

}

},{}],14:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

module.exports = function rooferRechnungCtrl($scope) {

  //TODO;

}

},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
/**
 * Created by isuarez on 4/29/14.
 */

'use strict';



module.exports = angular.module('App.Directives', [])

    .directive('jobStatus',  require('./jobStatus'))
.directive('dashboardJob',  require('./dashboardJob'));


},{"./dashboardJob":15,"./jobStatus":17}],17:[function(require,module,exports){
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
},{"../../../server/models/lookups":31}],18:[function(require,module,exports){
/**
 * Created by isuarez on 5/3/14.
 */

/**
 * Created by isuarez on 4/29/14.
 */

module.exports = function byDateFilter() {

    return function (list, theDate) {

        var todayDay;

        if (typeof theDate === 'undefined')
            todayDay = (new Date()).getDate();
        else
            todayDay = (new Date(theDate)).getDate();

        var jobDate;

        if ((typeof list === 'undefined')  || list.lenght === 0)
           return list;


            var tempList = [];
            list.forEach(function (item) {
                jobDate = new Date(item.StartDate).getDate();
                if (jobDate === todayDay)
                    tempList.push(item);
            });

        return tempList;

    };

}
},{}],19:[function(require,module,exports){
/**
 * Created by isuarez on 4/29/14.
 */

'use strict';



module.exports = angular.module('App.Filters', [])

    .filter('byDateFilter',  require('./byDateFilter'));


},{"./byDateFilter":18}],20:[function(require,module,exports){
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


},{}],21:[function(require,module,exports){
'use strict';

module.exports = angular.module('App.Resources', [])

    //Account
    .factory('jobResource',require('./jobResource'))
    .factory('userResource',require('./userResource'));

},{"./jobResource":22,"./userResource":23}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
'use strict';

module.exports = angular.module('App.Services', [])

    //Account
    .factory('authSvc',require('./authSvc'))
    .factory('identitySvc',require('./identitySvc'))
    .factory('jobSvc',require('./roofer/jobSvc'))
    .factory('inboxSvc',require('./roofer/inboxSvc'))
    .factory('dashboardSvc',require('./roofer/dashboardSvc'))

    .factory('notifierSvc',require('./notifierSvc'));

},{"./authSvc":24,"./identitySvc":25,"./notifierSvc":27,"./roofer/dashboardSvc":28,"./roofer/inboxSvc":29,"./roofer/jobSvc":30}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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
},{}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
/**
 * Created by isuarez on 5/3/14.
 */

module.exports = function jobSvc ($http, $q) {

    var jobsBaseUrl = '/api/contractor/jobs/';


    return {



        getJob: function getLatest(id) {

            var deferred = $q.defer();


            $http({
                    method: 'GET',
                    url: jobsBaseUrl +  id
                }
            ).success(function (data, status, headers, info) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, info) {
                    deferred.reject(status);
                })

            return deferred.promise;

        },


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
},{}],31:[function(require,module,exports){
/**
 * Created by isuarez on 4/17/2014.
 */

module.exports = {

    roles: {

        admin: 'admin',
        contractor: 'Kontraktor',
        customer: 'Kunde'

    },

    salutation: {

        Mr: 'Herr',
        Mrs: 'Frau',
        Miss: ''

    },

    //Should be translated
    orderType: {
        repair: 'Dachreparatur',
        check: 'Dachcheck'
    },

    roofType: {

        steep: 'Steildach',
        flat: 'Flachdach',
        other: 'Nicht angegeben'
    },

    propertyType: {
        singleFamily: 'Ein bis Zweifamilien Wohnhaus',
        multiFamily: 'Grosses Mehrfamilienwohnhaus',
        other: 'Anderes Haus'
    },

    contactType: {
        owner: 'Besitzer/in',
        renter: 'Mieter/in',
        concierge: 'Hausmeiser/in',
        roommate: 'MItberwohner/in',
        neighbour: 'Nachbar/in'
    },

    distanceType: {

        klm: 'KM',
        miles: 'miles'
    },

    jobStatus: {
        unknown : 'Nicht angegeben',
        created: 'Erstellt',
        requestAccepted: 'Angenommen',
        requestRejected: 'Anfrage Abgelehnt' ,
        workStarted: 'Gestartet',
        workCompleted: 'Fertig',
        workRejected: 'Vor Ort Abgelehnt'
    },

    paymentType: {

        cash:'Bar',
        bankTransfer: 'Bank Transfer',
        amex: 'Amex',
        visa: 'Visa',
        masterCard: 'Mastercard',
        discoverCard: 'Discover'

    },

    UnitOfMeasure: {

        Piece: 'Stueck',
        Meter: 'Meter',
        CubicMeter: 'Kubik Meter'
    }


};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9hcHAuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbmZpZy9jb25maWcuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL2FjY291bnQvaGVhZGVyTG9naW5DdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9hY2NvdW50L3Byb2ZpbGVDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9hY2NvdW50L3NpZ251cEN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL2luZGV4LmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9yb29mZXIvcm9vZmVyRGFzaGJvYXJkQ3RybC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvY29udHJvbGxlcnMvcm9vZmVyL3Jvb2ZlckluYm94Q3RybC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvY29udHJvbGxlcnMvcm9vZmVyL3Jvb2ZlckpvYkN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL3Jvb2Zlci9yb29mZXJKb2JTdGFydEN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL3Jvb2Zlci9yb29mZXJLdW5kZXJDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9yb29mZXIvcm9vZmVyUmVjaG51bmdDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9kaXJlY3RpdmVzL2Rhc2hib2FyZEpvYi5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvZGlyZWN0aXZlcy9pbmRleC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvZGlyZWN0aXZlcy9qb2JTdGF0dXMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2ZpbHRlcnMvYnlEYXRlRmlsdGVyLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9maWx0ZXJzL2luZGV4LmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9saWIvcm91dGVyLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9yZXNvdXJjZXMvaW5kZXguanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3Jlc291cmNlcy9qb2JSZXNvdXJjZS5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvcmVzb3VyY2VzL3VzZXJSZXNvdXJjZS5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvc2VydmljZXMvYXV0aFN2Yy5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvc2VydmljZXMvaWRlbnRpdHlTdmMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3NlcnZpY2VzL2luZGV4LmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9zZXJ2aWNlcy9ub3RpZmllclN2Yy5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvc2VydmljZXMvcm9vZmVyL2Rhc2hib2FyZFN2Yy5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvc2VydmljZXMvcm9vZmVyL2luYm94U3ZjLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9zZXJ2aWNlcy9yb29mZXIvam9iU3ZjLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvc2VydmVyL21vZGVscy9sb29rdXBzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMi8yNy8xNC5cbiAqL1xuXG4vL1dlIGFyZSBnZXR0aW5nIGFuZ3VhbHIgZnJvbSBjZG5cbnZhclxuICAgIGFwcF9yb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvYXBwL2NvbmZpZy9yb3V0ZXMuanMnKSxcbiAgICBjb250cm9sbGVycyA9IHJlcXVpcmUoJy4uLy4uL3B1YmxpYy9hcHAvY29udHJvbGxlcnMnKSxcbiAgICBzZXJ2aWNlcyA9IHJlcXVpcmUoJy4uLy4uL3B1YmxpYy9hcHAvc2VydmljZXMnKSxcbiAgICByZXNvdXJjZXMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvYXBwL3Jlc291cmNlcycpLFxuICAgIGRpcmVjdGl2ZXMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvYXBwL2RpcmVjdGl2ZXMnKSxcbiAgICBmaWx0ZXJzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2FwcC9maWx0ZXJzJyk7XG5cblxuLy9NYWluIEFuZ3VsYXIgbW9kdWxlLiBDb29sXG5hbmd1bGFyLm1vZHVsZSgnYXBwJyxcbiAgICAgICAgICAgICAgICAgIFsnbmdSZXNvdXJjZScsICduZ1JvdXRlJyxcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJzLm5hbWUsIHNlcnZpY2VzLm5hbWUsIGFwcF9yb3V0ZXMubmFtZSwgcmVzb3VyY2VzLm5hbWUsIGRpcmVjdGl2ZXMubmFtZSwgZmlsdGVycy5uYW1lXSk7XG5cblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkbG9jYXRpb24pXG57XG5cbiAgICAkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlRXJyb3InLCBmdW5jdGlvbihldnQsIGN1cnJlbnQsIHByZXZpb3VzLCByZWplY3Rpb24pIHtcbiAgICAgICAgaWYgKHJlamVjdGlvbiA9PT0gJ25vdCBhdXRob3JpemVkJykge1xuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzIwLzE0LlxuICovXG5cbiB2YXIgYXBwUHJlZml4ID0gJy8nO1xuIHZhciB0ZW1wbGF0ZVVybFByZWZpeCA9ICcvdGVtcGxhdGVzLyc7XG4gdmFyIGFwcFZlcnNpb24gPSAxO1xuXG4gbW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAgICAgdmVyc2lvbiA6IGFwcFZlcnNpb24sXG5cbiAgICAgICAgYmFzZURpcmVjdG9yeSA6IGFwcFByZWZpeCxcbiAgICAgICAgdGVtcGxhdGVEaXJlY3RvcnkgOiB0ZW1wbGF0ZVVybFByZWZpeCxcbiAgICAgICAgdGVtcGxhdGVGaWxlUXVlcnlzdHJpbmcgOiAnP3Y9JyArIGFwcFZlcnNpb24sXG5cbiAgICAgICAgcm91dGluZyA6IHtcblxuICAgICAgICAgICAgcHJlZml4IDogJycsXG4gICAgICAgICAgICBodG1sNU1vZGUgOiB0cnVlXG5cbiAgICAgICAgfSxcblxuICAgICAgICB2aWV3VXJsUHJlZml4IDogdGVtcGxhdGVVcmxQcmVmaXggKyAndmlld3MvJyxcbiAgICAgICAgcGFydGlhbFVybFByZWZpeCA6IHRlbXBsYXRlVXJsUHJlZml4ICsgJ3BhcnRpYWxzLycsXG5cbiAgICAgICAgdGVtcGxhdGVGaWxlU3VmZml4IDogJ190cGwuaHRtbCcsXG5cbiAgICAgICAgcHJlcGFyZVZpZXdUZW1wbGF0ZVVybCA6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlld1VybFByZWZpeCArIHVybCArIHRoaXMudGVtcGxhdGVGaWxlU3VmZml4ICtcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlRmlsZVF1ZXJ5c3RyaW5nO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgIGxpbWl0OiA1XG4gICAgICAgIH1cblxuXG59O1xuXG5cblxuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzkvMTQuXG4gKi9cblxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJ2FwcF9jb25maWcnKTtcbnZhciByb3V0ZXIgPSByZXF1aXJlKCcuLi8uLi8uLi9wdWJsaWMvYXBwL2xpYi9yb3V0ZXIuanMnKTtcblxuXG52YXIgYXBwX3JvdXRlcyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuUm91dGVzJyxbXSk7XG5cbmFwcF9yb3V0ZXMuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLFxuXG4gICAgICAgIGZ1bmN0aW9uICggJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAgICAgICAgIGlmIChjb25maWcucm91dGluZy5odG1sNU1vZGUpIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcm91dGluZ1ByZWZpeCA9IGNvbmZpZy5yb3V0aW5nLnByZWZpeDtcbiAgICAgICAgICAgICAgICBpZiAocm91dGluZ1ByZWZpeCAmJiByb3V0aW5nUHJlZml4Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeChyb3V0aW5nUHJlZml4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgKioqKioqKiogICBNYWluIFNpdGUgUm91dGVzICoqKioqKioqKioqKipcbiAgICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICByb3V0ZXIud2hlbignbWFpbl9vcmRlcl9zdGFydCcsICcvb3JkZXJfc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5PcmRlclN0YXJ0JyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ21haW4vb3JkZXJfc3RhcnQnKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICByb3V0ZXIud2hlbigncm9vZmVyX2Rhc2hib2FyZF9wYXRoJywgJy9yb29mZXIvZGFzaGJvYXJkJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyb29mZXJEYXNoYm9hcmRDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ3Jvb2Zlci9kYXNoYm9hcmQnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfaW5ib3hfcGF0aCcsICcvcm9vZmVyL2luYm94Jywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyb29mZXJJbmJveEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb25maWcucHJlcGFyZVZpZXdUZW1wbGF0ZVVybCgncm9vZmVyL2luYm94JylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3V0ZXIud2hlbigncm9vZmVyX2pvYnNfcGF0aCcsICcvcm9vZmVyL2pvYnMnLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jvb2ZlckpvYkN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb25maWcucHJlcGFyZVZpZXdUZW1wbGF0ZVVybCgncm9vZmVyL2pvYnMnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfam9ic19wYXRoJywgJy9yb29mZXIvam9iX3N0YXJ0LzppZCcsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVySm9iU3RhcnRDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ3Jvb2Zlci9qb2Jfc3RhcnQnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfa3VuZGVuX3BhdGgnLCAnL3Jvb2Zlci9rdW5kZW4nLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jvb2Zlckt1bmRlbkN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb25maWcucHJlcGFyZVZpZXdUZW1wbGF0ZVVybCgncm9vZmVyL2t1bmRlbicpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm91dGVyLndoZW4oJ3Jvb2Zlcl9yZWNobnVuZ19wYXRoJywgJy9yb29mZXIvcmVjaG51bmcnLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jvb2ZlclJlY2hudW5nQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbmZpZy5wcmVwYXJlVmlld1RlbXBsYXRlVXJsKCdyb29mZXIvcmVjaG51bmcnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfaG9tZV9wYXRoJywgJy8nLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jvb2ZlckRhc2hib2FyZEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb25maWcucHJlcGFyZVZpZXdUZW1wbGF0ZVVybCgncm9vZmVyL2Rhc2hib2FyZCcpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm91dGVyLmFsaWFzKCdob21lX3BhdGgnLCAncm9vZmVyX2Rhc2hib2FyZF9wYXRoJyk7XG5cbiAgICAgICAgICAgIHJvdXRlci5vdGhlcndpc2Uoe1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86ICcvcm9vZmVyL2Rhc2hib2FyZCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3V0ZXIuaW5zdGFsbCgkcm91dGVQcm92aWRlcik7XG4gICAgICAgIH1dKTtcblxuYXBwX3JvdXRlcy5ydW4oWyAnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCBmdW5jdGlvbiAoICRyb290U2NvcGUsICRsb2NhdGlvbikge1xuICAgICAgICB2YXIgcHJlZml4ID0gJyc7XG4gICAgICAgIGlmICghY29uZmlnLnJvdXRpbmcuaHRtbDVNb2RlKSB7XG4gICAgICAgICAgICBwcmVmaXggPSAnIycgKyBjb25maWcucm91dGluZy5wcmVmaXg7XG4gICAgICAgIH1cbiAgICAgICAgJHJvb3RTY29wZS5yb3V0ZSA9IGZ1bmN0aW9uICh1cmwsIGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXggKyByb3V0ZXIucm91dGVQYXRoKHVybCwgYXJncyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHJvb3RTY29wZS5yID0gJHJvb3RTY29wZS5yb3V0ZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmMgPSBmdW5jdGlvbiAocm91dGUsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gcm91dGVyLnJvdXRlUGF0aChyb3V0ZSk7XG4gICAgICAgICAgICBpZiAodXJsID09PSAkbG9jYXRpb24ucGF0aCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcHBfcm91dGVzO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8xMC8yMDE0LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAgZnVuY3Rpb24gaGVhZGVyTG9naW5DdHJsKCRzY29wZSwgJGh0dHAsIG5vdGlmaWVyU3ZjLCBpZGVudGl0eVN2YywgYXV0aFN2YywgJGxvY2F0aW9uKSB7XG5cbiAgICAkc2NvcGUuaWRlbnRpdHkgPSBpZGVudGl0eVN2YztcbiAgICAkc2NvcGUuc2lnbmluID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuXG4gICAgICAgIGF1dGhTdmMuYXV0aGVudGljYXRlVXNlcih1c2VybmFtZSwgcGFzc3dvcmQpLnRoZW4oZnVuY3Rpb24oc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpZXJTdmMubm90aWZ5KCdTdWNjZXNzIExvZ2luJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpZXJTdmMubm90aWZ5KCdFcnJvciBsb2dpbiBpbi4nKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG5cbiAgICAgICAgJHNjb3BlLnNpZ25vdXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgYXV0aFN2Yy5sb2dvdXRVc2VyKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlcm5hbWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICRzY29wZS5wYXNzd29yZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgbm90aWZpZXJTdmMubm90aWZ5KCdZb3UgaGF2ZSBiZWVuIHN1Y2Nlc3NmeWxseSBzaWduZSBvdXQnKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9cIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9XG5cbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8xMC8yMDE0LlxuICovXG4vKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAzLzI5LzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcHJvZmlsZUN0cmwoJHNjb3BlLCBhdXRoU3ZjLCBpZGVudGl0eVN2Yywgbm90aWZpZXJTdmMpIHtcblxuICAgIC8vQXNzaW5nIHRoZSBkYXRhXG4gICAgdmFyIHVzZXIgPSBpZGVudGl0eVN2Yy5jdXJyZW50VXNlcjtcbiAgICAkc2NvcGUuZW1haWwgPSB1c2VyLnVzZXJuYW1lO1xuICAgICRzY29wZS5mbmFtZSA9IHVzZXIuZmlyc3ROYW1lO1xuICAgICRzY29wZS5sbmFtZSA9IHVzZXIubGFzdE5hbWU7XG5cblxuICAgIC8vVXBkYXRlXG4gICAgJHNjb3BlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBuZXdVc2VyRGF0YSAgPSAge1xuICAgICAgICAgICAgdXNlcm5hbWU6ICRzY29wZS5lbWFpbCxcbiAgICAgICAgICAgIGZpcnN0TmFtZTogJHNjb3BlLmZuYW1lLFxuICAgICAgICAgICAgbGFzdE5hbWU6ICRzY29wZS5sbmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICgkc2NvcGUucGFzc3dvcmQgJiYgJHNjb3BlLnBhc3N3b3JkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUucGFzc3dvcmQ7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2FsbCB0aGUgcmNBdXRoIFNlcnZpY2VcbiAgICAgICAgYXV0aFN2Yy51cGRhdGVDdXJyZW50VXNlcihuZXdVc2VyRGF0YSkudGhlbihcbiAgICAgICAgICAgIC8vU3VjY2Vzc1xuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWVyU3ZjLm5vdGlmeSgnVXNlciBBY2NvdW50IGhhcyBiZWVuIHVwZGF0ZWQhJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy9GYWlsXG4gICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5lcnJvcihyZWFzb24pO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgIH1cblxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDMvMjcvMTQuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gIGZ1bmN0aW9uIHNpZ251cEN0cmwoJHNjb3BlLCBhdXRoU3ZjLCBub3RpZmllclN2YywgJGxvY2F0aW9uKSB7XG5cbiAgICAkc2NvcGUuc2lnbnVwID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy9DcmVhdGUgdGhlIG5ldyBVc2VyRGF0YSBvYmplY3RcbiAgICAgICAgdmFyIG5ld1VzZXJEYXRhICA9ICB7XG4gICAgICAgICAgICB1c2VybmFtZTogJHNjb3BlLmVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5wYXNzd29yZCxcbiAgICAgICAgICAgIGZpcnN0TmFtZTogJHNjb3BlLmZuYW1lLFxuICAgICAgICAgICAgbGFzdE5hbWU6ICRzY29wZS5sbmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vQ2FsbCB0aGUgcmNBdXRoIFNlcnZpY2VcbiAgICAgICAgYXV0aFN2Yy5jcmVhdGVVc2VyKG5ld1VzZXJEYXRhKS50aGVuKFxuICAgICAgICAgICAgLy9TdWNjZXNzXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpZXJTdmMubm90aWZ5KCdVc2VyIEFjY291bnQgQ3JlYXRlZCEnKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vRmFpbFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpZXJTdmMuZXJyb3IocmVhc29uKTtcbiAgICAgICAgICAgIH0pOztcblxuICAgICAgICAvL0VuZCBTaWdudXAgRnVuY3Rpb25cbiAgICB9O1xuXG5cblxuXG5cblxufSIsIid1c2Ugc3RyaWN0JztcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0FwcC5Db250cm9sbGVycycsIFtdKVxuXG4gICAgLy9BY2NvdW50XG4gICAgLy8uY29udHJvbGxlcigncHJvZmlsZUN0cmwnLCAgcmVxdWlyZShucGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwdWJsaWMnLCAnYXBwJywgJ2NvbnRyb2xsZXJzJywgJ2FjY291bnQnLCdwcm9maWxlQ3RybCcpKSlcbiAgICAuY29udHJvbGxlcigncHJvZmlsZUN0cmwnLCAgcmVxdWlyZSgnLi9hY2NvdW50L3Byb2ZpbGVDdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ2hlYWRlckxvZ2luQ3RybCcsIHJlcXVpcmUoJy4vYWNjb3VudC9oZWFkZXJMb2dpbkN0cmwnKSlcbiAgICAuY29udHJvbGxlcignc2lnbnVwQ3RybCcsIHJlcXVpcmUoJy4vYWNjb3VudC9zaWdudXBDdHJsJykpXG5cbiAgICAvL0FkbWluXG5cbiAgICAvL3Jvb2ZlclxuICAgIC5jb250cm9sbGVyKCdyb29mZXJEYXNoYm9hcmRDdHJsJyxyZXF1aXJlKCcuL3Jvb2Zlci9yb29mZXJEYXNoYm9hcmRDdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ3Jvb2ZlckluYm94Q3RybCcscmVxdWlyZSgnLi9yb29mZXIvcm9vZmVySW5ib3hDdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ3Jvb2ZlckpvYkN0cmwnLHJlcXVpcmUoJy4vcm9vZmVyL3Jvb2ZlckpvYkN0cmwnKSlcbiAgICAuY29udHJvbGxlcigncm9vZmVySm9iU3RhcnRDdHJsJyxyZXF1aXJlKCcuL3Jvb2Zlci9yb29mZXJKb2JTdGFydEN0cmwnKSlcbiAgICAuY29udHJvbGxlcigncm9vZmVyS3VuZGVyQ3RybCcscmVxdWlyZSgnLi9yb29mZXIvcm9vZmVyS3VuZGVyQ3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdyb29mZXJSZWNobnVuZ0N0cmwnLHJlcXVpcmUoJy4vcm9vZmVyL3Jvb2ZlclJlY2hudW5nQ3RybCcpKTtcblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMi8zLzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm9vZmVyRGFzaGJvYXJkQ3RybCgkc2NvcGUsIGRhc2hib2FyZFN2Yykge1xuXG4gICAgJHNjb3BlLmdldERhc2hib2FyZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICRzY29wZS5kYXRhID0gIGRhc2hib2FyZFN2Yy5kYXNoYm9hcmQoKTtcbiAgICAgICAgJHNjb3BlLmRhdGEudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGFzaGJvYXJkID0gZGF0YTtcbiAgICAgICAgICAgICRzY29wZS5uZXh0Sm9iID0gZ2V0TmV4dEV2ZW50KCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIC8vUnVuXG4gICAgJHNjb3BlLmdldERhc2hib2FyZCgpO1xuXG4gICAgZnVuY3Rpb24gZ2V0TmV4dEV2ZW50KCkge1xuXG4gICAgICAgIGlmICgkc2NvcGUuZGFzaGJvYXJkLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICByZXR1cm4gJHNjb3BlLmRhc2hib2FyZC5jb21pbmdVcFswXTtcblxuICAgIH1cblxuXG59O1xuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAyLzMvMTQuXG4gKi9cblxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJ2FwcF9jb25maWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmJveEN0cmwoJHNjb3BlLCBpbmJveFN2Yykge1xuXG5cbiAgICAvL0luaXQgdmFyXG4gICAgJHNjb3BlLm9mZnNldCA9IDA7XG4gICAgJHNjb3BlLnJvd3MgPSBbXVxuICAgICRzY29wZS50b3RhbEZvdW5kID0gMDtcblxuXG5cbiAgICAkc2NvcGUuZ2V0TGF0ZXN0ID0gZnVuY3Rpb24oKSB7XG5cblxuXG4gICAgICAgICRzY29wZS5kYXRhID0gIGluYm94U3ZjLmdldExhdGVzdCh7bGltaXQ6IGNvbmZpZy5wYWdpbmF0aW9uLmxpbWl0LCBvZmZzZXQ6ICRzY29wZS5vZmZzZXQgfSk7XG4gICAgICAgICRzY29wZS5kYXRhLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgJHNjb3BlLnJvd3MgPSAgICRzY29wZS5yb3dzLmNvbmNhdChkYXRhLnJvd3MpO1xuICAgICAgICAgICAgJHNjb3BlLnRvdGFsRm91bmQgPSBkYXRhLnRvdGFsRm91bmQ7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICRzY29wZS5sb2FkTW9yZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUub2Zmc2V0ICs9IGNvbmZpZy5wYWdpbmF0aW9uLmxpbWl0O1xuICAgICAgICAkc2NvcGUuZ2V0TGF0ZXN0KCk7XG4gICAgfTtcblxuICAgICRzY29wZS5tb3JlQXZhaWxhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkc2NvcGUudG90YWxGb3VuZCA+ICRzY29wZS5vZmZzZXQgKyBjb25maWcucGFnaW5hdGlvbi5saW1pdDtcbiAgICB9XG5cbiAgICAkc2NvcGUuZ2V0TGF0ZXN0KCk7XG5cbn1cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnYXBwX2NvbmZpZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvb2ZlckpvYkN0cmwoJHNjb3BlLCBqb2JTdmMpIHtcblxuXG4gICAgICAvL0luaXQgdmFyXG4gICAgICAkc2NvcGUub2Zmc2V0ID0gMDtcbiAgICAgJHNjb3BlLnJvd3MgPSBbXVxuICAgICAkc2NvcGUudG90YWxGb3VuZCA9IDA7XG5cblxuXG4gICAgJHNjb3BlLmdldExhdGVzdCA9IGZ1bmN0aW9uKCkge1xuXG5cblxuICAgICAgICAkc2NvcGUuZGF0YSA9ICBqb2JTdmMuZ2V0TGF0ZXN0KHtsaW1pdDogY29uZmlnLnBhZ2luYXRpb24ubGltaXQsIG9mZnNldDogJHNjb3BlLm9mZnNldCB9KTtcbiAgICAgICAgJHNjb3BlLmRhdGEudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAkc2NvcGUucm93cyA9ICAgJHNjb3BlLnJvd3MuY29uY2F0KGRhdGEucm93cyk7XG4gICAgICAgICAgICAkc2NvcGUudG90YWxGb3VuZCA9IGRhdGEudG90YWxGb3VuZDtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJHNjb3BlLmxvYWRNb3JlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5vZmZzZXQgKz0gY29uZmlnLnBhZ2luYXRpb24ubGltaXQ7XG4gICAgICAgICAkc2NvcGUuZ2V0TGF0ZXN0KCk7XG4gICAgfTtcblxuICAgICRzY29wZS5tb3JlQXZhaWxhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkc2NvcGUudG90YWxGb3VuZCA+ICRzY29wZS5vZmZzZXQgKyBjb25maWcucGFnaW5hdGlvbi5saW1pdDtcbiAgICB9XG5cbiAgICAgICAkc2NvcGUuZ2V0TGF0ZXN0KCk7XG5cbn1cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnYXBwX2NvbmZpZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvb2ZlckpvYlN0YXJ0Q3RybCgkc2NvcGUsICRyb3V0ZVBhcmFtcywgam9iU3ZjKSB7XG5cblxuICAgICAgLy9Jbml0IHZhclxuXG4gICAgJHNjb3BlLmdldEpvYiA9IGZ1bmN0aW9uIGdldEpvYigpIHtcblxuXG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSAgam9iU3ZjLmdldEpvYigkcm91dGVQYXJhbXMuaWQpO1xuICAgICAgICAkc2NvcGUuZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICRzY29wZS5qb2IgPSAgIGRhdGE7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuXG5cbiAgICAgICAkc2NvcGUuZ2V0Sm9iKCk7XG5cbn1cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvb2Zlckt1bmRlbkN0cmwoJHNjb3BlKSB7XG5cbiAgICAvL1RPRE87XG5cbn1cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvb2ZlclJlY2hudW5nQ3RybCgkc2NvcGUpIHtcblxuICAvL1RPRE87XG5cbn1cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMjkvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkYXNoYm9hcmRKb2IoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICAgIHJlcGxhY2U6ICd0cnVlJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvdGVtcGxhdGVzL2RpcmVjdGl2ZXMvZGFzaGJvYXJkSm9iLmh0bWwnXG5cbiAgICB9O1xufSIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMjkvMTQuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnQXBwLkRpcmVjdGl2ZXMnLCBbXSlcblxuICAgIC5kaXJlY3RpdmUoJ2pvYlN0YXR1cycsICByZXF1aXJlKCcuL2pvYlN0YXR1cycpKVxuLmRpcmVjdGl2ZSgnZGFzaGJvYXJkSm9iJywgIHJlcXVpcmUoJy4vZGFzaGJvYXJkSm9iJykpO1xuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzI5LzE0LlxuICovXG52YXIgbG9va3VwcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3NlcnZlci9tb2RlbHMvbG9va3VwcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGpvYlN0YXR1cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgc3RhdHVzOiAnQCdcbiAgICAgICAgfSxcbiAgICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICAgIHJlcGxhY2U6ICd0cnVlJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvdGVtcGxhdGVzL2RpcmVjdGl2ZXMvam9iU3RhdHVzLmh0bWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHJzKSB7XG5cblxuICAgICAgICAgICAgc3dpdGNoKGF0dHJzLnN0YXR1cylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjYXNlIGxvb2t1cHMuam9iU3RhdHVzLndvcmtDb21wbGV0ZWQ6XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmxhYmVsVHlwZSA9ICdwcmltYXJ5JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBsb29rdXBzLmpvYlN0YXR1cy5yZXF1ZXN0QWNjZXB0ZWQ6XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmxhYmVsVHlwZSA9ICdzdWNjZXNzJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBsb29rdXBzLmpvYlN0YXR1cy53b3JrU3RhcnRlZDpcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubGFiZWxUeXBlID0gJ3dhcm5pbmcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGxvb2t1cHMuam9iU3RhdHVzLmNyZWF0ZWQ6XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmxhYmVsVHlwZSA9ICdkYW5nZXInO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFR5cGUgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cbiAgICB9O1xufSIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDUvMy8xNC5cbiAqL1xuXG4vKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzI5LzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnlEYXRlRmlsdGVyKCkge1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChsaXN0LCB0aGVEYXRlKSB7XG5cbiAgICAgICAgdmFyIHRvZGF5RGF5O1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhlRGF0ZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB0b2RheURheSA9IChuZXcgRGF0ZSgpKS5nZXREYXRlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRvZGF5RGF5ID0gKG5ldyBEYXRlKHRoZURhdGUpKS5nZXREYXRlKCk7XG5cbiAgICAgICAgdmFyIGpvYkRhdGU7XG5cbiAgICAgICAgaWYgKCh0eXBlb2YgbGlzdCA9PT0gJ3VuZGVmaW5lZCcpICB8fCBsaXN0LmxlbmdodCA9PT0gMClcbiAgICAgICAgICAgcmV0dXJuIGxpc3Q7XG5cblxuICAgICAgICAgICAgdmFyIHRlbXBMaXN0ID0gW107XG4gICAgICAgICAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBqb2JEYXRlID0gbmV3IERhdGUoaXRlbS5TdGFydERhdGUpLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoam9iRGF0ZSA9PT0gdG9kYXlEYXkpXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaXN0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGVtcExpc3Q7XG5cbiAgICB9O1xuXG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8yOS8xNC5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuRmlsdGVycycsIFtdKVxuXG4gICAgLmZpbHRlcignYnlEYXRlRmlsdGVyJywgIHJlcXVpcmUoJy4vYnlEYXRlRmlsdGVyJykpO1xuXG4iLCIgICAgdmFyIGxvb2t1cCA9IHt9O1xuICAgIHZhciBvdGhlcndpc2VMb29rdXAgPSBudWxsO1xuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAgICAgd2hlbiA6IGZ1bmN0aW9uKGtleSwgdXJsLCBwYXJhbXMpIHtcbiAgICAgICAgICAgIGxvb2t1cFtrZXldID0ge1xuICAgICAgICAgICAgICAgIHVybCA6IHVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXMgOiBwYXJhbXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWxpYXMgOiBmdW5jdGlvbihrZXkxLCBrZXkyKSB7XG4gICAgICAgICAgICBsb29rdXBba2V5MV0gPSBsb29rdXBba2V5Ml07XG4gICAgICAgIH0sXG5cbiAgICAgICAgb3RoZXJ3aXNlIDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgICAgICBvdGhlcndpc2VMb29rdXAgPSBwYXJhbXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVwbGFjZVVybFBhcmFtcyA6IGZ1bmN0aW9uKHVybCwgcGFyYW1zKSB7XG4gICAgICAgICAgICBmb3IodmFyIGsgaW4gcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgdmFyIHYgPSBwYXJhbXNba107XG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoJzonK2ssdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJvdXRlRGVmaW5lZCA6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuICEhIHRoaXMuZ2V0Um91dGUoa2V5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRSb3V0ZSA6IGZ1bmN0aW9uKGtleSwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIGxvb2t1cFtrZXldO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJvdXRlUGF0aCA6IGZ1bmN0aW9uKGtleSwgYXJncykge1xuICAgICAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0Um91dGUoa2V5KTtcbiAgICAgICAgICAgIHVybCA9IHVybCA/IHVybC51cmwgOiBudWxsO1xuICAgICAgICAgICAgaWYodXJsICYmIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLnJlcGxhY2VVcmxQYXJhbXModXJsLCBhcmdzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluc3RhbGwgOiBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gbG9va3VwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvdXRlID0gbG9va3VwW2tleV07XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IHJvdXRlWyd1cmwnXTtcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0gcm91dGVbJ3BhcmFtcyddO1xuICAgICAgICAgICAgICAgICRyb3V0ZVByb3ZpZGVyLndoZW4odXJsLCBwYXJhbXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKG90aGVyd2lzZUxvb2t1cCkge1xuICAgICAgICAgICAgICAgICRyb3V0ZVByb3ZpZGVyLm90aGVyd2lzZShvdGhlcndpc2VMb29rdXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuUmVzb3VyY2VzJywgW10pXG5cbiAgICAvL0FjY291bnRcbiAgICAuZmFjdG9yeSgnam9iUmVzb3VyY2UnLHJlcXVpcmUoJy4vam9iUmVzb3VyY2UnKSlcbiAgICAuZmFjdG9yeSgndXNlclJlc291cmNlJyxyZXF1aXJlKCcuL3VzZXJSZXNvdXJjZScpKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMjAvMTQuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8xMC8yMDE0LlxuICovXG5cbi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDMvMjUvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBqb2JSZXNvdXJjZSgkcmVzb3VyY2UpIHtcblxuICAgIHZhciBKb2JSZXNvdXJjZSA9ICRyZXNvdXJjZSgnL2FwaS9jb250cmFjdG9yL2pvYnMvOmlkJywge19pZDogJ0BpZCd9LFxuICAgICAgICB7XG4gICAgICAgICAgICB1cGRhdGU6IHttZXRob2Q6ICdQVVQnLCBpc0FycmF5OmZhbHNlfSxcbiAgICAgICAgICAgIGxpc3Q6e2lzQXJyYXk6dHJ1ZSwgbWV0aG9kOidnZXQnLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybVJlc3BvbnNlOiBmdW5jdGlvbiAoZGF0YSwgaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICB9XG4gICAgKTtcblxuXG5cbiAgICByZXR1cm4gSm9iUmVzb3VyY2U7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8xMC8yMDE0LlxuICovXG5cbi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDMvMjUvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB1c2VyUmVzb3VyY2UoJHJlc291cmNlKSB7XG5cbiAgICB2YXIgVXNlclJlc291cmNlID0gJHJlc291cmNlKCcvYXBpL3VzZXJzLzppZCcsIHtfaWQ6IFwiQGlkXCJ9LFxuICAgICAgICB7XG4gICAgICAgICAgICB1cGRhdGU6IHttZXRob2Q6ICdQVVQnLCBpc0FycmF5OmZhbHNlfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIFVzZXJSZXNvdXJjZS5wcm90b3R5cGUuaXNBZG1pbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm9sZXMgJiYgdGhpcy5oYXNSb2xlKCdhZG1pbicpO1xuICAgIH07XG5cbiAgICBVc2VyUmVzb3VyY2UucHJvdG90eXBlLmlzQ29udHJhY3RvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb2xlcyAmJiB0aGlzLmhhc1JvbGUoJ2NvbnRyYWN0b3InKTtcbiAgICB9O1xuXG4gICAgVXNlclJlc291cmNlLnByb3RvdHlwZS5oYXNSb2xlID0gZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb2xlcy5pbmRleE9mKHJvbGUpID4gLTE7XG4gICAgfTtcblxuICAgIHJldHVybiBVc2VyUmVzb3VyY2U7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMy8yMC8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGF1dGhTdmMgICgkaHR0cCwgaWRlbnRpdHlTdmMsICRxLCB1c2VyUmVzb3VyY2UpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgYXV0aGVudGljYXRlVXNlcjogZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9sb2dpbicsIHt1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IHVzZXJSZXNvdXJjZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5leHRlbmQodXNlciwgcmVzcG9uc2UuZGF0YS51c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyID0gdXNlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9LFxuXG5cbiAgICAgICAgY3JlYXRlVXNlcjogZnVuY3Rpb24obmV3VXNlckRhdGEpIHtcblxuICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgdXNlclJlc291cmNlKG5ld1VzZXJEYXRhKTtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIHVzZXIuJHNhdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZGVudGl0eVN2Yy5jdXJyZW50VXNlciA9IHVzZXI7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlc3BvbnNlLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIHVwZGF0ZUN1cnJlbnRVc2VyOiBmdW5jdGlvbihuZXdVc2VyRGF0YSkge1xuXG4gICAgICAgICAgICAvL2Nsb25pbmcgdGhlIGN1cnJlbnQgdXNlciBpbiBvcmRlciB0byBleHRlbmQgaXQgd2l0aCBuZXdVU2VyRGF0YS5cbiAgICAgICAgICAgIC8vT25seSBpcyBzYXZlIGlzIHN1Y2Nlc3MgaWRlbnRpdHlTdmMuY3VycmVudFVzZXIgd2lsbCBiZSB1cGRhdGVkLlxuICAgICAgICAgICAgdmFyIGNsb25lID0gYW5ndWxhci5jb3B5KGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKGNsb25lLCBuZXdVc2VyRGF0YSk7XG5cbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIGNsb25lLiR1cGRhdGUoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZGVudGl0eVN2Yy5jdXJyZW50VXNlciA9IGNsb25lO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZXNwb25zZS5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXV0aG9yaXplQ3VycmVudFVzZXJGb3JSb3V0ZTogIGZ1bmN0aW9uIChyb2xlKSB7XG4gICAgICAgICAgICBpZiAoaWRlbnRpdHlTdmMuaXNBdXRob3JpemVkKHJvbGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KCdub3QgYXV0aG9yaXplZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGF1dGhvcml6ZUF1dGhlbnRpY2F0ZWRVc2VyRm9yUm91dGU6ICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaWRlbnRpdHlTdmMuaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoJ25vdCBhdXRob3JpemVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9nb3V0VXNlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgZGVmZmVyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9sb2dvdXQnLCB7bG9nb3V0OiB0cnVlfSkudGhlbihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlTdmMuY3VycmVudFVzZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGRlZmZlcmVkLnJlc29sdmUoKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZmZXJlZC5wcm9taXNlO1xuXG4gICAgICAgIH1cblxuICAgIH07XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8xMC8yMDE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaWRlbnRpdHlTdmMoJHdpbmRvdywgdXNlclJlc291cmNlKSB7XG5cbiAgICB2YXIgY3VycmVudFVzZXI7XG5cbiAgICBpZiAoISEkd2luZG93LmN1cnJlbnRVc2VyICkge1xuXG4gICAgICAgIGN1cnJlbnRVc2VyID0gbmV3IHVzZXJSZXNvdXJjZSgpO1xuICAgICAgICBhbmd1bGFyLmV4dGVuZChjdXJyZW50VXNlciwkd2luZG93LmN1cnJlbnRVc2VyKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGN1cnJlbnRVc2VyOiBjdXJyZW50VXNlcixcblxuICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5jdXJyZW50VXNlcjtcbiAgICAgICAgfSxcblxuICAgICAgICBpc0F1dGhvcml6ZWQ6IGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIHRoaXMuY3VycmVudFVzZXIuaGFzUm9sZShyb2xlKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuU2VydmljZXMnLCBbXSlcblxuICAgIC8vQWNjb3VudFxuICAgIC5mYWN0b3J5KCdhdXRoU3ZjJyxyZXF1aXJlKCcuL2F1dGhTdmMnKSlcbiAgICAuZmFjdG9yeSgnaWRlbnRpdHlTdmMnLHJlcXVpcmUoJy4vaWRlbnRpdHlTdmMnKSlcbiAgICAuZmFjdG9yeSgnam9iU3ZjJyxyZXF1aXJlKCcuL3Jvb2Zlci9qb2JTdmMnKSlcbiAgICAuZmFjdG9yeSgnaW5ib3hTdmMnLHJlcXVpcmUoJy4vcm9vZmVyL2luYm94U3ZjJykpXG4gICAgLmZhY3RvcnkoJ2Rhc2hib2FyZFN2YycscmVxdWlyZSgnLi9yb29mZXIvZGFzaGJvYXJkU3ZjJykpXG5cbiAgICAuZmFjdG9yeSgnbm90aWZpZXJTdmMnLHJlcXVpcmUoJy4vbm90aWZpZXJTdmMnKSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAzLzIwLzE0LlxuICovXG4vL3RvYXN0ciBjb21lcyBmcm9tIHZlbmRvci5taW4uanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3RpZmllclN2YygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBub3RpZnk6IGZ1bmN0aW9uKG1zZykge1xuICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MobXNnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKG1zZykge1xuICAgICAgICAgICAgdG9hc3RyLmVycm9yKG1zZyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNS8zLzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGFzaGJvYXJkU3ZjKCRodHRwLCAkcSkge1xuXG4gICAgdmFyIGpvYnNCYXNlVXJsID0gJy9hcGkvY29udHJhY3Rvci9kYXNoYm9hcmQvJztcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgZGFzaGJvYXJkOiBmdW5jdGlvbiBkYXNoYm9hcmQoKSB7XG5cbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cblxuICAgICAgICAgICAgJGh0dHAoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGpvYnNCYXNlVXJsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KS5lcnJvcihmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBpbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChzdGF0dXMpO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA1LzMvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmJveFN2YygkaHR0cCwgJHEpIHtcblxuICAgIHZhciBiYXNlVXJsID0gJy9hcGkvY29udHJhY3Rvci9pbmJveC8nO1xuXG5cbiAgICByZXR1cm4ge1xuXG5cblxuICAgICAgICBnZXRMYXRlc3Q6IGZ1bmN0aW9uIGdldExhc3Rlc3Qob3B0aW9ucykge1xuXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAvL0dldHRpbmcgdGhlIHNlcnZpY2VzXG4gICAgICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogYmFzZVVybCArICc/bGltaXQ9JyArIG9wdGlvbnMubGltaXQgKyAnJm9mZnNldD0nICsgb3B0aW9ucy5vZmZzZXRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLnN1Y2Nlc3MoZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgaGVhZGVycywgaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgfVxuICAgIH1cblxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDUvMy8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGpvYlN2YyAoJGh0dHAsICRxKSB7XG5cbiAgICB2YXIgam9ic0Jhc2VVcmwgPSAnL2FwaS9jb250cmFjdG9yL2pvYnMvJztcblxuXG4gICAgcmV0dXJuIHtcblxuXG5cbiAgICAgICAgZ2V0Sm9iOiBmdW5jdGlvbiBnZXRMYXRlc3QoaWQpIHtcblxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuXG4gICAgICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogam9ic0Jhc2VVcmwgKyAgaWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLnN1Y2Nlc3MoZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgaGVhZGVycywgaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgfSxcblxuXG4gICAgICAgIGdldExhdGVzdDogZnVuY3Rpb24gZ2V0TGF0ZXN0KG9wdGlvbnMpIHtcblxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuXG4gICAgICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogam9ic0Jhc2VVcmwgKyAnP2xpbWl0PScrIG9wdGlvbnMubGltaXQgKyAnJm9mZnNldD0nICsgb3B0aW9ucy5vZmZzZXRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLnN1Y2Nlc3MoZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgaGVhZGVycywgaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgfVxuICAgIH1cblxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMTcvMjAxNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIHJvbGVzOiB7XG5cbiAgICAgICAgYWRtaW46ICdhZG1pbicsXG4gICAgICAgIGNvbnRyYWN0b3I6ICdLb250cmFrdG9yJyxcbiAgICAgICAgY3VzdG9tZXI6ICdLdW5kZSdcblxuICAgIH0sXG5cbiAgICBzYWx1dGF0aW9uOiB7XG5cbiAgICAgICAgTXI6ICdIZXJyJyxcbiAgICAgICAgTXJzOiAnRnJhdScsXG4gICAgICAgIE1pc3M6ICcnXG5cbiAgICB9LFxuXG4gICAgLy9TaG91bGQgYmUgdHJhbnNsYXRlZFxuICAgIG9yZGVyVHlwZToge1xuICAgICAgICByZXBhaXI6ICdEYWNocmVwYXJhdHVyJyxcbiAgICAgICAgY2hlY2s6ICdEYWNoY2hlY2snXG4gICAgfSxcblxuICAgIHJvb2ZUeXBlOiB7XG5cbiAgICAgICAgc3RlZXA6ICdTdGVpbGRhY2gnLFxuICAgICAgICBmbGF0OiAnRmxhY2hkYWNoJyxcbiAgICAgICAgb3RoZXI6ICdOaWNodCBhbmdlZ2ViZW4nXG4gICAgfSxcblxuICAgIHByb3BlcnR5VHlwZToge1xuICAgICAgICBzaW5nbGVGYW1pbHk6ICdFaW4gYmlzIFp3ZWlmYW1pbGllbiBXb2huaGF1cycsXG4gICAgICAgIG11bHRpRmFtaWx5OiAnR3Jvc3NlcyBNZWhyZmFtaWxpZW53b2huaGF1cycsXG4gICAgICAgIG90aGVyOiAnQW5kZXJlcyBIYXVzJ1xuICAgIH0sXG5cbiAgICBjb250YWN0VHlwZToge1xuICAgICAgICBvd25lcjogJ0Jlc2l0emVyL2luJyxcbiAgICAgICAgcmVudGVyOiAnTWlldGVyL2luJyxcbiAgICAgICAgY29uY2llcmdlOiAnSGF1c21laXNlci9pbicsXG4gICAgICAgIHJvb21tYXRlOiAnTUl0YmVyd29obmVyL2luJyxcbiAgICAgICAgbmVpZ2hib3VyOiAnTmFjaGJhci9pbidcbiAgICB9LFxuXG4gICAgZGlzdGFuY2VUeXBlOiB7XG5cbiAgICAgICAga2xtOiAnS00nLFxuICAgICAgICBtaWxlczogJ21pbGVzJ1xuICAgIH0sXG5cbiAgICBqb2JTdGF0dXM6IHtcbiAgICAgICAgdW5rbm93biA6ICdOaWNodCBhbmdlZ2ViZW4nLFxuICAgICAgICBjcmVhdGVkOiAnRXJzdGVsbHQnLFxuICAgICAgICByZXF1ZXN0QWNjZXB0ZWQ6ICdBbmdlbm9tbWVuJyxcbiAgICAgICAgcmVxdWVzdFJlamVjdGVkOiAnQW5mcmFnZSBBYmdlbGVobnQnICxcbiAgICAgICAgd29ya1N0YXJ0ZWQ6ICdHZXN0YXJ0ZXQnLFxuICAgICAgICB3b3JrQ29tcGxldGVkOiAnRmVydGlnJyxcbiAgICAgICAgd29ya1JlamVjdGVkOiAnVm9yIE9ydCBBYmdlbGVobnQnXG4gICAgfSxcblxuICAgIHBheW1lbnRUeXBlOiB7XG5cbiAgICAgICAgY2FzaDonQmFyJyxcbiAgICAgICAgYmFua1RyYW5zZmVyOiAnQmFuayBUcmFuc2ZlcicsXG4gICAgICAgIGFtZXg6ICdBbWV4JyxcbiAgICAgICAgdmlzYTogJ1Zpc2EnLFxuICAgICAgICBtYXN0ZXJDYXJkOiAnTWFzdGVyY2FyZCcsXG4gICAgICAgIGRpc2NvdmVyQ2FyZDogJ0Rpc2NvdmVyJ1xuXG4gICAgfSxcblxuICAgIFVuaXRPZk1lYXN1cmU6IHtcblxuICAgICAgICBQaWVjZTogJ1N0dWVjaycsXG4gICAgICAgIE1ldGVyOiAnTWV0ZXInLFxuICAgICAgICBDdWJpY01ldGVyOiAnS3ViaWsgTWV0ZXInXG4gICAgfVxuXG5cbn07Il19
