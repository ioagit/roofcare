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
},{"../../public/app/config/routes.js":4,"../../public/app/controllers":8,"../../public/app/directives":17,"../../public/app/filters":20,"../../public/app/resources":22,"../../public/app/services":27}],"9dpAQ+":[function(require,module,exports){
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


            router.when('main_order_start', '/order_start', {
                controller: 'mainOrderStart',
                templateUrl: config.prepareViewTemplateUrl('main/order_start')
            });


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

            /*
            router.when('roofer_home_path', '/', {
                controller: 'rooferDashboardCtrl',
                templateUrl: config.prepareViewTemplateUrl('roofer/dashboard')
            });
            */

            //router.alias('home_path', 'roofer_dashboard_path');

            /*
            router.otherwise({
                redirectTo: '/roofer/dashboard'
            });
            */

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

},{"../../../public/app/lib/router.js":21,"app_config":"9dpAQ+"}],5:[function(require,module,exports){
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

    //main
    .controller('mainOrderStart',require('./main/mainOrderStartCtrl'))


    //roofer
    .controller('rooferDashboardCtrl',require('./roofer/rooferDashboardCtrl'))
    .controller('rooferInboxCtrl',require('./roofer/rooferInboxCtrl'))
    .controller('rooferJobCtrl',require('./roofer/rooferJobCtrl'))
    .controller('rooferJobStartCtrl',require('./roofer/rooferJobStartCtrl'))
    .controller('rooferKunderCtrl',require('./roofer/rooferKunderCtrl'))
    .controller('rooferRechnungCtrl',require('./roofer/rooferRechnungCtrl'));


},{"./account/headerLoginCtrl":5,"./account/profileCtrl":6,"./account/signupCtrl":7,"./main/mainOrderStartCtrl":9,"./roofer/rooferDashboardCtrl":10,"./roofer/rooferInboxCtrl":11,"./roofer/rooferJobCtrl":12,"./roofer/rooferJobStartCtrl":13,"./roofer/rooferKunderCtrl":14,"./roofer/rooferRechnungCtrl":15}],9:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

var config = require('app_config');

module.exports = function mainOrderStartCtrl($scope) {

    //Do nothing for now.
    //It is just a couple of links

}

},{"app_config":"9dpAQ+"}],10:[function(require,module,exports){
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


},{}],11:[function(require,module,exports){
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

},{"app_config":"9dpAQ+"}],12:[function(require,module,exports){
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

},{"app_config":"9dpAQ+"}],13:[function(require,module,exports){
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

},{"app_config":"9dpAQ+"}],14:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

module.exports = function rooferKundenCtrl($scope) {

    //TODO;

}

},{}],15:[function(require,module,exports){
/**
 * Created by isuarez on 2/3/14.
 */

module.exports = function rooferRechnungCtrl($scope) {

  //TODO;

}

},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
/**
 * Created by isuarez on 4/29/14.
 */

'use strict';



module.exports = angular.module('App.Directives', [])

    .directive('jobStatus',  require('./jobStatus'))
.directive('dashboardJob',  require('./dashboardJob'));


},{"./dashboardJob":16,"./jobStatus":18}],18:[function(require,module,exports){
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
},{"../../../server/models/lookups":32}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
/**
 * Created by isuarez on 4/29/14.
 */

'use strict';



module.exports = angular.module('App.Filters', [])

    .filter('byDateFilter',  require('./byDateFilter'));


},{"./byDateFilter":19}],21:[function(require,module,exports){
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


},{}],22:[function(require,module,exports){
'use strict';

module.exports = angular.module('App.Resources', [])

    //Account
    .factory('jobResource',require('./jobResource'))
    .factory('userResource',require('./userResource'));

},{"./jobResource":23,"./userResource":24}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
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
},{}],27:[function(require,module,exports){
'use strict';

module.exports = angular.module('App.Services', [])

    //Account
    .factory('authSvc',require('./authSvc'))
    .factory('identitySvc',require('./identitySvc'))
    .factory('jobSvc',require('./roofer/jobSvc'))
    .factory('inboxSvc',require('./roofer/inboxSvc'))
    .factory('dashboardSvc',require('./roofer/dashboardSvc'))

    .factory('notifierSvc',require('./notifierSvc'));

},{"./authSvc":25,"./identitySvc":26,"./notifierSvc":28,"./roofer/dashboardSvc":29,"./roofer/inboxSvc":30,"./roofer/jobSvc":31}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){
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
},{}],32:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9hcHAuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbmZpZy9jb25maWcuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL2FjY291bnQvaGVhZGVyTG9naW5DdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9hY2NvdW50L3Byb2ZpbGVDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9hY2NvdW50L3NpZ251cEN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL2luZGV4LmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9tYWluL21haW5PcmRlclN0YXJ0Q3RybC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvY29udHJvbGxlcnMvcm9vZmVyL3Jvb2ZlckRhc2hib2FyZEN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL3Jvb2Zlci9yb29mZXJJbmJveEN0cmwuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzL3Jvb2Zlci9yb29mZXJKb2JDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9yb29mZXIvcm9vZmVySm9iU3RhcnRDdHJsLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9jb250cm9sbGVycy9yb29mZXIvcm9vZmVyS3VuZGVyQ3RybC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvY29udHJvbGxlcnMvcm9vZmVyL3Jvb2ZlclJlY2hudW5nQ3RybC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvZGlyZWN0aXZlcy9kYXNoYm9hcmRKb2IuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2RpcmVjdGl2ZXMvaW5kZXguanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL2RpcmVjdGl2ZXMvam9iU3RhdHVzLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9maWx0ZXJzL2J5RGF0ZUZpbHRlci5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvZmlsdGVycy9pbmRleC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvbGliL3JvdXRlci5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvcmVzb3VyY2VzL2luZGV4LmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9yZXNvdXJjZXMvam9iUmVzb3VyY2UuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3Jlc291cmNlcy91c2VyUmVzb3VyY2UuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3NlcnZpY2VzL2F1dGhTdmMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3NlcnZpY2VzL2lkZW50aXR5U3ZjLmpzIiwiL1VzZXJzL2lzdWFyZXovcHJvamVjdHMvcm9vZmNhcmUvcHVibGljL2FwcC9zZXJ2aWNlcy9pbmRleC5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvc2VydmljZXMvbm90aWZpZXJTdmMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3NlcnZpY2VzL3Jvb2Zlci9kYXNoYm9hcmRTdmMuanMiLCIvVXNlcnMvaXN1YXJlei9wcm9qZWN0cy9yb29mY2FyZS9wdWJsaWMvYXBwL3NlcnZpY2VzL3Jvb2Zlci9pbmJveFN2Yy5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3B1YmxpYy9hcHAvc2VydmljZXMvcm9vZmVyL2pvYlN2Yy5qcyIsIi9Vc2Vycy9pc3VhcmV6L3Byb2plY3RzL3Jvb2ZjYXJlL3NlcnZlci9tb2RlbHMvbG9va3Vwcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMjcvMTQuXG4gKi9cblxuLy9XZSBhcmUgZ2V0dGluZyBhbmd1YWxyIGZyb20gY2RuXG52YXJcbiAgICBhcHBfcm91dGVzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2FwcC9jb25maWcvcm91dGVzLmpzJyksXG4gICAgY29udHJvbGxlcnMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvYXBwL2NvbnRyb2xsZXJzJyksXG4gICAgc2VydmljZXMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvYXBwL3NlcnZpY2VzJyksXG4gICAgcmVzb3VyY2VzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2FwcC9yZXNvdXJjZXMnKSxcbiAgICBkaXJlY3RpdmVzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2FwcC9kaXJlY3RpdmVzJyksXG4gICAgZmlsdGVycyA9IHJlcXVpcmUoJy4uLy4uL3B1YmxpYy9hcHAvZmlsdGVycycpO1xuXG5cbi8vTWFpbiBBbmd1bGFyIG1vZHVsZS4gQ29vbFxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsXG4gICAgICAgICAgICAgICAgICBbJ25nUmVzb3VyY2UnLCAnbmdSb3V0ZScsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVycy5uYW1lLCBzZXJ2aWNlcy5uYW1lLCBhcHBfcm91dGVzLm5hbWUsIHJlc291cmNlcy5uYW1lLCBkaXJlY3RpdmVzLm5hbWUsIGZpbHRlcnMubmFtZV0pO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvY2F0aW9uKVxue1xuXG4gICAgJHJvb3RTY29wZS4kb24oJyRyb3V0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24oZXZ0LCBjdXJyZW50LCBwcmV2aW91cywgcmVqZWN0aW9uKSB7XG4gICAgICAgIGlmIChyZWplY3Rpb24gPT09ICdub3QgYXV0aG9yaXplZCcpIHtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8yMC8xNC5cbiAqL1xuXG4gdmFyIGFwcFByZWZpeCA9ICcvJztcbiB2YXIgdGVtcGxhdGVVcmxQcmVmaXggPSAnL3RlbXBsYXRlcy8nO1xuIHZhciBhcHBWZXJzaW9uID0gMTtcblxuIG1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgICAgIHZlcnNpb24gOiBhcHBWZXJzaW9uLFxuXG4gICAgICAgIGJhc2VEaXJlY3RvcnkgOiBhcHBQcmVmaXgsXG4gICAgICAgIHRlbXBsYXRlRGlyZWN0b3J5IDogdGVtcGxhdGVVcmxQcmVmaXgsXG4gICAgICAgIHRlbXBsYXRlRmlsZVF1ZXJ5c3RyaW5nIDogJz92PScgKyBhcHBWZXJzaW9uLFxuXG4gICAgICAgIHJvdXRpbmcgOiB7XG5cbiAgICAgICAgICAgIHByZWZpeCA6ICcnLFxuICAgICAgICAgICAgaHRtbDVNb2RlIDogdHJ1ZVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdmlld1VybFByZWZpeCA6IHRlbXBsYXRlVXJsUHJlZml4ICsgJ3ZpZXdzLycsXG4gICAgICAgIHBhcnRpYWxVcmxQcmVmaXggOiB0ZW1wbGF0ZVVybFByZWZpeCArICdwYXJ0aWFscy8nLFxuXG4gICAgICAgIHRlbXBsYXRlRmlsZVN1ZmZpeCA6ICdfdHBsLmh0bWwnLFxuXG4gICAgICAgIHByZXBhcmVWaWV3VGVtcGxhdGVVcmwgOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXdVcmxQcmVmaXggKyB1cmwgKyB0aGlzLnRlbXBsYXRlRmlsZVN1ZmZpeCArXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUZpbGVRdWVyeXN0cmluZztcbiAgICAgICAgfSxcblxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICBsaW1pdDogNVxuICAgICAgICB9XG5cblxufTtcblxuXG5cblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC85LzE0LlxuICovXG5cbnZhciBjb25maWcgPSByZXF1aXJlKCdhcHBfY29uZmlnJyk7XG52YXIgcm91dGVyID0gcmVxdWlyZSgnLi4vLi4vLi4vcHVibGljL2FwcC9saWIvcm91dGVyLmpzJyk7XG5cblxudmFyIGFwcF9yb3V0ZXMgPSBhbmd1bGFyLm1vZHVsZSgnQXBwLlJvdXRlcycsW10pO1xuXG5hcHBfcm91dGVzLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJyxcblxuICAgICAgICBmdW5jdGlvbiAoICRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuXG4gICAgICAgICAgICBpZiAoY29uZmlnLnJvdXRpbmcuaHRtbDVNb2RlKSB7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvdXRpbmdQcmVmaXggPSBjb25maWcucm91dGluZy5wcmVmaXg7XG4gICAgICAgICAgICAgICAgaWYgKHJvdXRpbmdQcmVmaXggJiYgcm91dGluZ1ByZWZpeC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmhhc2hQcmVmaXgocm91dGluZ1ByZWZpeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICoqKioqKioqICAgTWFpbiBTaXRlIFJvdXRlcyAqKioqKioqKioqKioqXG4gICAgICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdtYWluX29yZGVyX3N0YXJ0JywgJy9vcmRlcl9zdGFydCcsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbk9yZGVyU3RhcnQnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb25maWcucHJlcGFyZVZpZXdUZW1wbGF0ZVVybCgnbWFpbi9vcmRlcl9zdGFydCcpXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICByb3V0ZXIud2hlbigncm9vZmVyX2Rhc2hib2FyZF9wYXRoJywgJy9yb29mZXIvZGFzaGJvYXJkJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyb29mZXJEYXNoYm9hcmRDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ3Jvb2Zlci9kYXNoYm9hcmQnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfaW5ib3hfcGF0aCcsICcvcm9vZmVyL2luYm94Jywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyb29mZXJJbmJveEN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb25maWcucHJlcGFyZVZpZXdUZW1wbGF0ZVVybCgncm9vZmVyL2luYm94JylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByb3V0ZXIud2hlbigncm9vZmVyX2pvYnNfcGF0aCcsICcvcm9vZmVyL2pvYnMnLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jvb2ZlckpvYkN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb25maWcucHJlcGFyZVZpZXdUZW1wbGF0ZVVybCgncm9vZmVyL2pvYnMnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfam9ic19wYXRoJywgJy9yb29mZXIvam9iX3N0YXJ0LzppZCcsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncm9vZmVySm9iU3RhcnRDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ3Jvb2Zlci9qb2Jfc3RhcnQnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvdXRlci53aGVuKCdyb29mZXJfa3VuZGVuX3BhdGgnLCAnL3Jvb2Zlci9rdW5kZW4nLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jvb2Zlckt1bmRlbkN0cmwnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb25maWcucHJlcGFyZVZpZXdUZW1wbGF0ZVVybCgncm9vZmVyL2t1bmRlbicpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm91dGVyLndoZW4oJ3Jvb2Zlcl9yZWNobnVuZ19wYXRoJywgJy9yb29mZXIvcmVjaG51bmcnLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jvb2ZlclJlY2hudW5nQ3RybCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbmZpZy5wcmVwYXJlVmlld1RlbXBsYXRlVXJsKCdyb29mZXIvcmVjaG51bmcnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICByb3V0ZXIud2hlbigncm9vZmVyX2hvbWVfcGF0aCcsICcvJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyb29mZXJEYXNoYm9hcmRDdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogY29uZmlnLnByZXBhcmVWaWV3VGVtcGxhdGVVcmwoJ3Jvb2Zlci9kYXNoYm9hcmQnKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAvL3JvdXRlci5hbGlhcygnaG9tZV9wYXRoJywgJ3Jvb2Zlcl9kYXNoYm9hcmRfcGF0aCcpO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgcm91dGVyLm90aGVyd2lzZSh7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogJy9yb29mZXIvZGFzaGJvYXJkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICByb3V0ZXIuaW5zdGFsbCgkcm91dGVQcm92aWRlcik7XG4gICAgICAgIH1dKTtcblxuYXBwX3JvdXRlcy5ydW4oWyAnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCBmdW5jdGlvbiAoICRyb290U2NvcGUsICRsb2NhdGlvbikge1xuICAgICAgICB2YXIgcHJlZml4ID0gJyc7XG4gICAgICAgIGlmICghY29uZmlnLnJvdXRpbmcuaHRtbDVNb2RlKSB7XG4gICAgICAgICAgICBwcmVmaXggPSAnIycgKyBjb25maWcucm91dGluZy5wcmVmaXg7XG4gICAgICAgIH1cbiAgICAgICAgJHJvb3RTY29wZS5yb3V0ZSA9IGZ1bmN0aW9uICh1cmwsIGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXggKyByb3V0ZXIucm91dGVQYXRoKHVybCwgYXJncyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHJvb3RTY29wZS5yID0gJHJvb3RTY29wZS5yb3V0ZTtcblxuICAgICAgICAkcm9vdFNjb3BlLmMgPSBmdW5jdGlvbiAocm91dGUsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gcm91dGVyLnJvdXRlUGF0aChyb3V0ZSk7XG4gICAgICAgICAgICBpZiAodXJsID09PSAkbG9jYXRpb24ucGF0aCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcHBfcm91dGVzO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8xMC8yMDE0LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAgZnVuY3Rpb24gaGVhZGVyTG9naW5DdHJsKCRzY29wZSwgJGh0dHAsIG5vdGlmaWVyU3ZjLCBpZGVudGl0eVN2YywgYXV0aFN2YywgJGxvY2F0aW9uKSB7XG5cbiAgICAkc2NvcGUuaWRlbnRpdHkgPSBpZGVudGl0eVN2YztcbiAgICAkc2NvcGUuc2lnbmluID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuXG4gICAgICAgIGF1dGhTdmMuYXV0aGVudGljYXRlVXNlcih1c2VybmFtZSwgcGFzc3dvcmQpLnRoZW4oZnVuY3Rpb24oc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpZXJTdmMubm90aWZ5KCdTdWNjZXNzIExvZ2luJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpZXJTdmMubm90aWZ5KCdFcnJvciBsb2dpbiBpbi4nKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG5cbiAgICAgICAgJHNjb3BlLnNpZ25vdXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgYXV0aFN2Yy5sb2dvdXRVc2VyKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlcm5hbWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICRzY29wZS5wYXNzd29yZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgbm90aWZpZXJTdmMubm90aWZ5KCdZb3UgaGF2ZSBiZWVuIHN1Y2Nlc3NmeWxseSBzaWduZSBvdXQnKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9cIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9XG5cbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8xMC8yMDE0LlxuICovXG4vKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAzLzI5LzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcHJvZmlsZUN0cmwoJHNjb3BlLCBhdXRoU3ZjLCBpZGVudGl0eVN2Yywgbm90aWZpZXJTdmMpIHtcblxuICAgIC8vQXNzaW5nIHRoZSBkYXRhXG4gICAgdmFyIHVzZXIgPSBpZGVudGl0eVN2Yy5jdXJyZW50VXNlcjtcbiAgICAkc2NvcGUuZW1haWwgPSB1c2VyLnVzZXJuYW1lO1xuICAgICRzY29wZS5mbmFtZSA9IHVzZXIuZmlyc3ROYW1lO1xuICAgICRzY29wZS5sbmFtZSA9IHVzZXIubGFzdE5hbWU7XG5cblxuICAgIC8vVXBkYXRlXG4gICAgJHNjb3BlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBuZXdVc2VyRGF0YSAgPSAge1xuICAgICAgICAgICAgdXNlcm5hbWU6ICRzY29wZS5lbWFpbCxcbiAgICAgICAgICAgIGZpcnN0TmFtZTogJHNjb3BlLmZuYW1lLFxuICAgICAgICAgICAgbGFzdE5hbWU6ICRzY29wZS5sbmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICgkc2NvcGUucGFzc3dvcmQgJiYgJHNjb3BlLnBhc3N3b3JkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUucGFzc3dvcmQ7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2FsbCB0aGUgcmNBdXRoIFNlcnZpY2VcbiAgICAgICAgYXV0aFN2Yy51cGRhdGVDdXJyZW50VXNlcihuZXdVc2VyRGF0YSkudGhlbihcbiAgICAgICAgICAgIC8vU3VjY2Vzc1xuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWVyU3ZjLm5vdGlmeSgnVXNlciBBY2NvdW50IGhhcyBiZWVuIHVwZGF0ZWQhJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy9GYWlsXG4gICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBub3RpZmllclN2Yy5lcnJvcihyZWFzb24pO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgIH1cblxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDMvMjcvMTQuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gIGZ1bmN0aW9uIHNpZ251cEN0cmwoJHNjb3BlLCBhdXRoU3ZjLCBub3RpZmllclN2YywgJGxvY2F0aW9uKSB7XG5cbiAgICAkc2NvcGUuc2lnbnVwID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy9DcmVhdGUgdGhlIG5ldyBVc2VyRGF0YSBvYmplY3RcbiAgICAgICAgdmFyIG5ld1VzZXJEYXRhICA9ICB7XG4gICAgICAgICAgICB1c2VybmFtZTogJHNjb3BlLmVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5wYXNzd29yZCxcbiAgICAgICAgICAgIGZpcnN0TmFtZTogJHNjb3BlLmZuYW1lLFxuICAgICAgICAgICAgbGFzdE5hbWU6ICRzY29wZS5sbmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vQ2FsbCB0aGUgcmNBdXRoIFNlcnZpY2VcbiAgICAgICAgYXV0aFN2Yy5jcmVhdGVVc2VyKG5ld1VzZXJEYXRhKS50aGVuKFxuICAgICAgICAgICAgLy9TdWNjZXNzXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpZXJTdmMubm90aWZ5KCdVc2VyIEFjY291bnQgQ3JlYXRlZCEnKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vRmFpbFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpZXJTdmMuZXJyb3IocmVhc29uKTtcbiAgICAgICAgICAgIH0pOztcblxuICAgICAgICAvL0VuZCBTaWdudXAgRnVuY3Rpb25cbiAgICB9O1xuXG5cblxuXG5cblxufSIsIid1c2Ugc3RyaWN0JztcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0FwcC5Db250cm9sbGVycycsIFtdKVxuXG4gICAgLy9BY2NvdW50XG4gICAgLy8uY29udHJvbGxlcigncHJvZmlsZUN0cmwnLCAgcmVxdWlyZShucGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwdWJsaWMnLCAnYXBwJywgJ2NvbnRyb2xsZXJzJywgJ2FjY291bnQnLCdwcm9maWxlQ3RybCcpKSlcbiAgICAuY29udHJvbGxlcigncHJvZmlsZUN0cmwnLCAgcmVxdWlyZSgnLi9hY2NvdW50L3Byb2ZpbGVDdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ2hlYWRlckxvZ2luQ3RybCcsIHJlcXVpcmUoJy4vYWNjb3VudC9oZWFkZXJMb2dpbkN0cmwnKSlcbiAgICAuY29udHJvbGxlcignc2lnbnVwQ3RybCcsIHJlcXVpcmUoJy4vYWNjb3VudC9zaWdudXBDdHJsJykpXG5cbiAgICAvL21haW5cbiAgICAuY29udHJvbGxlcignbWFpbk9yZGVyU3RhcnQnLHJlcXVpcmUoJy4vbWFpbi9tYWluT3JkZXJTdGFydEN0cmwnKSlcblxuXG4gICAgLy9yb29mZXJcbiAgICAuY29udHJvbGxlcigncm9vZmVyRGFzaGJvYXJkQ3RybCcscmVxdWlyZSgnLi9yb29mZXIvcm9vZmVyRGFzaGJvYXJkQ3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdyb29mZXJJbmJveEN0cmwnLHJlcXVpcmUoJy4vcm9vZmVyL3Jvb2ZlckluYm94Q3RybCcpKVxuICAgIC5jb250cm9sbGVyKCdyb29mZXJKb2JDdHJsJyxyZXF1aXJlKCcuL3Jvb2Zlci9yb29mZXJKb2JDdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ3Jvb2ZlckpvYlN0YXJ0Q3RybCcscmVxdWlyZSgnLi9yb29mZXIvcm9vZmVySm9iU3RhcnRDdHJsJykpXG4gICAgLmNvbnRyb2xsZXIoJ3Jvb2Zlckt1bmRlckN0cmwnLHJlcXVpcmUoJy4vcm9vZmVyL3Jvb2Zlckt1bmRlckN0cmwnKSlcbiAgICAuY29udHJvbGxlcigncm9vZmVyUmVjaG51bmdDdHJsJyxyZXF1aXJlKCcuL3Jvb2Zlci9yb29mZXJSZWNobnVuZ0N0cmwnKSk7XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnYXBwX2NvbmZpZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1haW5PcmRlclN0YXJ0Q3RybCgkc2NvcGUpIHtcblxuICAgIC8vRG8gbm90aGluZyBmb3Igbm93LlxuICAgIC8vSXQgaXMganVzdCBhIGNvdXBsZSBvZiBsaW5rc1xuXG59XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAyLzMvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb29mZXJEYXNoYm9hcmRDdHJsKCRzY29wZSwgZGFzaGJvYXJkU3ZjKSB7XG5cbiAgICAkc2NvcGUuZ2V0RGFzaGJvYXJkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSAgZGFzaGJvYXJkU3ZjLmRhc2hib2FyZCgpO1xuICAgICAgICAkc2NvcGUuZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXNoYm9hcmQgPSBkYXRhO1xuICAgICAgICAgICAgJHNjb3BlLm5leHRKb2IgPSBnZXROZXh0RXZlbnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgLy9SdW5cbiAgICAkc2NvcGUuZ2V0RGFzaGJvYXJkKCk7XG5cbiAgICBmdW5jdGlvbiBnZXROZXh0RXZlbnQoKSB7XG5cbiAgICAgICAgaWYgKCRzY29wZS5kYXNoYm9hcmQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHJldHVybiAkc2NvcGUuZGFzaGJvYXJkLmNvbWluZ1VwWzBdO1xuXG4gICAgfVxuXG5cbn07XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDIvMy8xNC5cbiAqL1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnYXBwX2NvbmZpZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluYm94Q3RybCgkc2NvcGUsIGluYm94U3ZjKSB7XG5cblxuICAgIC8vSW5pdCB2YXJcbiAgICAkc2NvcGUub2Zmc2V0ID0gMDtcbiAgICAkc2NvcGUucm93cyA9IFtdXG4gICAgJHNjb3BlLnRvdGFsRm91bmQgPSAwO1xuXG5cblxuICAgICRzY29wZS5nZXRMYXRlc3QgPSBmdW5jdGlvbigpIHtcblxuXG5cbiAgICAgICAgJHNjb3BlLmRhdGEgPSAgaW5ib3hTdmMuZ2V0TGF0ZXN0KHtsaW1pdDogY29uZmlnLnBhZ2luYXRpb24ubGltaXQsIG9mZnNldDogJHNjb3BlLm9mZnNldCB9KTtcbiAgICAgICAgJHNjb3BlLmRhdGEudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAkc2NvcGUucm93cyA9ICAgJHNjb3BlLnJvd3MuY29uY2F0KGRhdGEucm93cyk7XG4gICAgICAgICAgICAkc2NvcGUudG90YWxGb3VuZCA9IGRhdGEudG90YWxGb3VuZDtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJHNjb3BlLmxvYWRNb3JlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5vZmZzZXQgKz0gY29uZmlnLnBhZ2luYXRpb24ubGltaXQ7XG4gICAgICAgICRzY29wZS5nZXRMYXRlc3QoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm1vcmVBdmFpbGFibGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRzY29wZS50b3RhbEZvdW5kID4gJHNjb3BlLm9mZnNldCArIGNvbmZpZy5wYWdpbmF0aW9uLmxpbWl0O1xuICAgIH1cblxuICAgICRzY29wZS5nZXRMYXRlc3QoKTtcblxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMi8zLzE0LlxuICovXG5cbnZhciBjb25maWcgPSByZXF1aXJlKCdhcHBfY29uZmlnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm9vZmVySm9iQ3RybCgkc2NvcGUsIGpvYlN2Yykge1xuXG5cbiAgICAgIC8vSW5pdCB2YXJcbiAgICAgICRzY29wZS5vZmZzZXQgPSAwO1xuICAgICAkc2NvcGUucm93cyA9IFtdXG4gICAgICRzY29wZS50b3RhbEZvdW5kID0gMDtcblxuXG5cbiAgICAkc2NvcGUuZ2V0TGF0ZXN0ID0gZnVuY3Rpb24oKSB7XG5cblxuXG4gICAgICAgICRzY29wZS5kYXRhID0gIGpvYlN2Yy5nZXRMYXRlc3Qoe2xpbWl0OiBjb25maWcucGFnaW5hdGlvbi5saW1pdCwgb2Zmc2V0OiAkc2NvcGUub2Zmc2V0IH0pO1xuICAgICAgICAkc2NvcGUuZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICRzY29wZS5yb3dzID0gICAkc2NvcGUucm93cy5jb25jYXQoZGF0YS5yb3dzKTtcbiAgICAgICAgICAgICRzY29wZS50b3RhbEZvdW5kID0gZGF0YS50b3RhbEZvdW5kO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkc2NvcGUubG9hZE1vcmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLm9mZnNldCArPSBjb25maWcucGFnaW5hdGlvbi5saW1pdDtcbiAgICAgICAgICRzY29wZS5nZXRMYXRlc3QoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm1vcmVBdmFpbGFibGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRzY29wZS50b3RhbEZvdW5kID4gJHNjb3BlLm9mZnNldCArIGNvbmZpZy5wYWdpbmF0aW9uLmxpbWl0O1xuICAgIH1cblxuICAgICAgICRzY29wZS5nZXRMYXRlc3QoKTtcblxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMi8zLzE0LlxuICovXG5cbnZhciBjb25maWcgPSByZXF1aXJlKCdhcHBfY29uZmlnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm9vZmVySm9iU3RhcnRDdHJsKCRzY29wZSwgJHJvdXRlUGFyYW1zLCBqb2JTdmMpIHtcblxuXG4gICAgICAvL0luaXQgdmFyXG5cbiAgICAkc2NvcGUuZ2V0Sm9iID0gZnVuY3Rpb24gZ2V0Sm9iKCkge1xuXG5cblxuICAgICAgICAkc2NvcGUuZGF0YSA9ICBqb2JTdmMuZ2V0Sm9iKCRyb3V0ZVBhcmFtcy5pZCk7XG4gICAgICAgICRzY29wZS5kYXRhLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgJHNjb3BlLmpvYiA9ICAgZGF0YTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG5cblxuICAgICAgICRzY29wZS5nZXRKb2IoKTtcblxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMi8zLzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm9vZmVyS3VuZGVuQ3RybCgkc2NvcGUpIHtcblxuICAgIC8vVE9ETztcblxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMi8zLzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm9vZmVyUmVjaG51bmdDdHJsKCRzY29wZSkge1xuXG4gIC8vVE9ETztcblxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8yOS8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRhc2hib2FyZEpvYigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgICAgcmVwbGFjZTogJ3RydWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy90ZW1wbGF0ZXMvZGlyZWN0aXZlcy9kYXNoYm9hcmRKb2IuaHRtbCdcblxuICAgIH07XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8yOS8xNC5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdBcHAuRGlyZWN0aXZlcycsIFtdKVxuXG4gICAgLmRpcmVjdGl2ZSgnam9iU3RhdHVzJywgIHJlcXVpcmUoJy4vam9iU3RhdHVzJykpXG4uZGlyZWN0aXZlKCdkYXNoYm9hcmRKb2InLCAgcmVxdWlyZSgnLi9kYXNoYm9hcmRKb2InKSk7XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMjkvMTQuXG4gKi9cbnZhciBsb29rdXBzID0gcmVxdWlyZSgnLi4vLi4vLi4vc2VydmVyL21vZGVscy9sb29rdXBzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gam9iU3RhdHVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBzdGF0dXM6ICdAJ1xuICAgICAgICB9LFxuICAgICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgICAgcmVwbGFjZTogJ3RydWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy90ZW1wbGF0ZXMvZGlyZWN0aXZlcy9qb2JTdGF0dXMuaHRtbCcsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cnMpIHtcblxuXG4gICAgICAgICAgICBzd2l0Y2goYXR0cnMuc3RhdHVzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhc2UgbG9va3Vwcy5qb2JTdGF0dXMud29ya0NvbXBsZXRlZDpcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubGFiZWxUeXBlID0gJ3ByaW1hcnknO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGxvb2t1cHMuam9iU3RhdHVzLnJlcXVlc3RBY2NlcHRlZDpcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubGFiZWxUeXBlID0gJ3N1Y2Nlc3MnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGxvb2t1cHMuam9iU3RhdHVzLndvcmtTdGFydGVkOlxuICAgICAgICAgICAgICAgICAgICBzY29wZS5sYWJlbFR5cGUgPSAnd2FybmluZyc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgbG9va3Vwcy5qb2JTdGF0dXMuY3JlYXRlZDpcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubGFiZWxUeXBlID0gJ2Rhbmdlcic7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmxhYmVsVHlwZSA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgIH07XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNS8zLzE0LlxuICovXG5cbi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDQvMjkvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBieURhdGVGaWx0ZXIoKSB7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKGxpc3QsIHRoZURhdGUpIHtcblxuICAgICAgICB2YXIgdG9kYXlEYXk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGVEYXRlID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHRvZGF5RGF5ID0gKG5ldyBEYXRlKCkpLmdldERhdGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdG9kYXlEYXkgPSAobmV3IERhdGUodGhlRGF0ZSkpLmdldERhdGUoKTtcblxuICAgICAgICB2YXIgam9iRGF0ZTtcblxuICAgICAgICBpZiAoKHR5cGVvZiBsaXN0ID09PSAndW5kZWZpbmVkJykgIHx8IGxpc3QubGVuZ2h0ID09PSAwKVxuICAgICAgICAgICByZXR1cm4gbGlzdDtcblxuXG4gICAgICAgICAgICB2YXIgdGVtcExpc3QgPSBbXTtcbiAgICAgICAgICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGpvYkRhdGUgPSBuZXcgRGF0ZShpdGVtLlN0YXJ0RGF0ZSkuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChqb2JEYXRlID09PSB0b2RheURheSlcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpc3QucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0ZW1wTGlzdDtcblxuICAgIH07XG5cbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzI5LzE0LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0FwcC5GaWx0ZXJzJywgW10pXG5cbiAgICAuZmlsdGVyKCdieURhdGVGaWx0ZXInLCAgcmVxdWlyZSgnLi9ieURhdGVGaWx0ZXInKSk7XG5cbiIsIiAgICB2YXIgbG9va3VwID0ge307XG4gICAgdmFyIG90aGVyd2lzZUxvb2t1cCA9IG51bGw7XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgICAgICB3aGVuIDogZnVuY3Rpb24oa2V5LCB1cmwsIHBhcmFtcykge1xuICAgICAgICAgICAgbG9va3VwW2tleV0gPSB7XG4gICAgICAgICAgICAgICAgdXJsIDogdXJsLFxuICAgICAgICAgICAgICAgIHBhcmFtcyA6IHBhcmFtc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICBhbGlhcyA6IGZ1bmN0aW9uKGtleTEsIGtleTIpIHtcbiAgICAgICAgICAgIGxvb2t1cFtrZXkxXSA9IGxvb2t1cFtrZXkyXTtcbiAgICAgICAgfSxcblxuICAgICAgICBvdGhlcndpc2UgOiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgICAgIG90aGVyd2lzZUxvb2t1cCA9IHBhcmFtcztcbiAgICAgICAgfSxcblxuICAgICAgICByZXBsYWNlVXJsUGFyYW1zIDogZnVuY3Rpb24odXJsLCBwYXJhbXMpIHtcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IHBhcmFtc1trXTtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgnOicrayx2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcm91dGVEZWZpbmVkIDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gISEgdGhpcy5nZXRSb3V0ZShrZXkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFJvdXRlIDogZnVuY3Rpb24oa2V5LCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9va3VwW2tleV07XG4gICAgICAgIH0sXG5cbiAgICAgICAgcm91dGVQYXRoIDogZnVuY3Rpb24oa2V5LCBhcmdzKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gdGhpcy5nZXRSb3V0ZShrZXkpO1xuICAgICAgICAgICAgdXJsID0gdXJsID8gdXJsLnVybCA6IG51bGw7XG4gICAgICAgICAgICBpZih1cmwgJiYgYXJncykge1xuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMucmVwbGFjZVVybFBhcmFtcyh1cmwsIGFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5zdGFsbCA6IGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBsb29rdXApIHtcbiAgICAgICAgICAgICAgICB2YXIgcm91dGUgPSBsb29rdXBba2V5XTtcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gcm91dGVbJ3VybCddO1xuICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSByb3V0ZVsncGFyYW1zJ107XG4gICAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXIud2hlbih1cmwsIHBhcmFtcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYob3RoZXJ3aXNlTG9va3VwKSB7XG4gICAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXIub3RoZXJ3aXNlKG90aGVyd2lzZUxvb2t1cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0FwcC5SZXNvdXJjZXMnLCBbXSlcblxuICAgIC8vQWNjb3VudFxuICAgIC5mYWN0b3J5KCdqb2JSZXNvdXJjZScscmVxdWlyZSgnLi9qb2JSZXNvdXJjZScpKVxuICAgIC5mYWN0b3J5KCd1c2VyUmVzb3VyY2UnLHJlcXVpcmUoJy4vdXNlclJlc291cmNlJykpO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8yMC8xNC5cbiAqL1xuXG4vKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMy8yNS8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGpvYlJlc291cmNlKCRyZXNvdXJjZSkge1xuXG4gICAgdmFyIEpvYlJlc291cmNlID0gJHJlc291cmNlKCcvYXBpL2NvbnRyYWN0b3Ivam9icy86aWQnLCB7X2lkOiAnQGlkJ30sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVwZGF0ZToge21ldGhvZDogJ1BVVCcsIGlzQXJyYXk6ZmFsc2V9LFxuICAgICAgICAgICAgbGlzdDp7aXNBcnJheTp0cnVlLCBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtUmVzcG9uc2U6IGZ1bmN0aW9uIChkYXRhLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgIH1cbiAgICApO1xuXG5cblxuICAgIHJldHVybiBKb2JSZXNvdXJjZTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gMy8yNS8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHVzZXJSZXNvdXJjZSgkcmVzb3VyY2UpIHtcblxuICAgIHZhciBVc2VyUmVzb3VyY2UgPSAkcmVzb3VyY2UoJy9hcGkvdXNlcnMvOmlkJywge19pZDogXCJAaWRcIn0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVwZGF0ZToge21ldGhvZDogJ1BVVCcsIGlzQXJyYXk6ZmFsc2V9XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgVXNlclJlc291cmNlLnByb3RvdHlwZS5pc0FkbWluID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb2xlcyAmJiB0aGlzLmhhc1JvbGUoJ2FkbWluJyk7XG4gICAgfTtcblxuICAgIFVzZXJSZXNvdXJjZS5wcm90b3R5cGUuaXNDb250cmFjdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVzICYmIHRoaXMuaGFzUm9sZSgnY29udHJhY3RvcicpO1xuICAgIH07XG5cbiAgICBVc2VyUmVzb3VyY2UucHJvdG90eXBlLmhhc1JvbGUgPSBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVzLmluZGV4T2Yocm9sZSkgPiAtMTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFVzZXJSZXNvdXJjZTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiAzLzIwLzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXV0aFN2YyAgKCRodHRwLCBpZGVudGl0eVN2YywgJHEsIHVzZXJSZXNvdXJjZSkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBhdXRoZW50aWNhdGVVc2VyOiBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2xvZ2luJywge3VzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgdXNlclJlc291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmV4dGVuZCh1c2VyLCByZXNwb25zZS5kYXRhLnVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlTdmMuY3VycmVudFVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0sXG5cblxuICAgICAgICBjcmVhdGVVc2VyOiBmdW5jdGlvbihuZXdVc2VyRGF0YSkge1xuXG4gICAgICAgICAgICB2YXIgdXNlciA9IG5ldyB1c2VyUmVzb3VyY2UobmV3VXNlckRhdGEpO1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgdXNlci4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyID0gdXNlcjtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVzcG9uc2UuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9LFxuXG5cbiAgICAgICAgdXBkYXRlQ3VycmVudFVzZXI6IGZ1bmN0aW9uKG5ld1VzZXJEYXRhKSB7XG5cbiAgICAgICAgICAgIC8vY2xvbmluZyB0aGUgY3VycmVudCB1c2VyIGluIG9yZGVyIHRvIGV4dGVuZCBpdCB3aXRoIG5ld1VTZXJEYXRhLlxuICAgICAgICAgICAgLy9Pbmx5IGlzIHNhdmUgaXMgc3VjY2VzcyBpZGVudGl0eVN2Yy5jdXJyZW50VXNlciB3aWxsIGJlIHVwZGF0ZWQuXG4gICAgICAgICAgICB2YXIgY2xvbmUgPSBhbmd1bGFyLmNvcHkoaWRlbnRpdHlTdmMuY3VycmVudFVzZXIpO1xuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoY2xvbmUsIG5ld1VzZXJEYXRhKTtcblxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgY2xvbmUuJHVwZGF0ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkZW50aXR5U3ZjLmN1cnJlbnRVc2VyID0gY2xvbmU7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlc3BvbnNlLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBhdXRob3JpemVDdXJyZW50VXNlckZvclJvdXRlOiAgZnVuY3Rpb24gKHJvbGUpIHtcbiAgICAgICAgICAgIGlmIChpZGVudGl0eVN2Yy5pc0F1dGhvcml6ZWQocm9sZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoJ25vdCBhdXRob3JpemVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXV0aG9yaXplQXV0aGVudGljYXRlZFVzZXJGb3JSb3V0ZTogIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpZGVudGl0eVN2Yy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCgnbm90IGF1dGhvcml6ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBsb2dvdXRVc2VyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBkZWZmZXJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2xvZ291dCcsIHtsb2dvdXQ6IHRydWV9KS50aGVuKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZGVudGl0eVN2Yy5jdXJyZW50VXNlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgZGVmZmVyZWQucmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmZlcmVkLnByb21pc2U7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA0LzEwLzIwMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZGVudGl0eVN2Yygkd2luZG93LCB1c2VyUmVzb3VyY2UpIHtcblxuICAgIHZhciBjdXJyZW50VXNlcjtcblxuICAgIGlmICghISR3aW5kb3cuY3VycmVudFVzZXIgKSB7XG5cbiAgICAgICAgY3VycmVudFVzZXIgPSBuZXcgdXNlclJlc291cmNlKCk7XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKGN1cnJlbnRVc2VyLCR3aW5kb3cuY3VycmVudFVzZXIpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgY3VycmVudFVzZXI6IGN1cnJlbnRVc2VyLFxuXG4gICAgICAgIGlzQXV0aGVudGljYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRVc2VyO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzQXV0aG9yaXplZDogZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgdGhpcy5jdXJyZW50VXNlci5oYXNSb2xlKHJvbGUpO1xuICAgICAgICB9XG5cblxuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0FwcC5TZXJ2aWNlcycsIFtdKVxuXG4gICAgLy9BY2NvdW50XG4gICAgLmZhY3RvcnkoJ2F1dGhTdmMnLHJlcXVpcmUoJy4vYXV0aFN2YycpKVxuICAgIC5mYWN0b3J5KCdpZGVudGl0eVN2YycscmVxdWlyZSgnLi9pZGVudGl0eVN2YycpKVxuICAgIC5mYWN0b3J5KCdqb2JTdmMnLHJlcXVpcmUoJy4vcm9vZmVyL2pvYlN2YycpKVxuICAgIC5mYWN0b3J5KCdpbmJveFN2YycscmVxdWlyZSgnLi9yb29mZXIvaW5ib3hTdmMnKSlcbiAgICAuZmFjdG9yeSgnZGFzaGJvYXJkU3ZjJyxyZXF1aXJlKCcuL3Jvb2Zlci9kYXNoYm9hcmRTdmMnKSlcblxuICAgIC5mYWN0b3J5KCdub3RpZmllclN2YycscmVxdWlyZSgnLi9ub3RpZmllclN2YycpKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDMvMjAvMTQuXG4gKi9cbi8vdG9hc3RyIGNvbWVzIGZyb20gdmVuZG9yLm1pbi5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vdGlmaWVyU3ZjKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5vdGlmeTogZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAgICB0b2FzdHIuc3VjY2Vzcyhtc2cpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBlcnJvcjogZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAgICB0b2FzdHIuZXJyb3IobXNnKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaXN1YXJleiBvbiA1LzMvMTQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkYXNoYm9hcmRTdmMoJGh0dHAsICRxKSB7XG5cbiAgICB2YXIgam9ic0Jhc2VVcmwgPSAnL2FwaS9jb250cmFjdG9yL2Rhc2hib2FyZC8nO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBkYXNoYm9hcmQ6IGZ1bmN0aW9uIGRhc2hib2FyZCgpIHtcblxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuXG4gICAgICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogam9ic0Jhc2VVcmxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLnN1Y2Nlc3MoZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgaGVhZGVycywgaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgfVxuICAgIH1cblxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBpc3VhcmV6IG9uIDUvMy8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluYm94U3ZjKCRodHRwLCAkcSkge1xuXG4gICAgdmFyIGJhc2VVcmwgPSAnL2FwaS9jb250cmFjdG9yL2luYm94Lyc7XG5cblxuICAgIHJldHVybiB7XG5cblxuXG4gICAgICAgIGdldExhdGVzdDogZnVuY3Rpb24gZ2V0TGFzdGVzdChvcHRpb25zKSB7XG5cbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIC8vR2V0dGluZyB0aGUgc2VydmljZXNcbiAgICAgICAgICAgICRodHRwKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBiYXNlVXJsICsgJz9saW1pdD0nICsgb3B0aW9ucy5saW1pdCArICcmb2Zmc2V0PScgKyBvcHRpb25zLm9mZnNldFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBpbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgaGVhZGVycywgaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoc3RhdHVzKTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblxuICAgICAgICB9XG4gICAgfVxuXG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNS8zLzE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gam9iU3ZjICgkaHR0cCwgJHEpIHtcblxuICAgIHZhciBqb2JzQmFzZVVybCA9ICcvYXBpL2NvbnRyYWN0b3Ivam9icy8nO1xuXG5cbiAgICByZXR1cm4ge1xuXG5cblxuICAgICAgICBnZXRKb2I6IGZ1bmN0aW9uIGdldExhdGVzdChpZCkge1xuXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG5cbiAgICAgICAgICAgICRodHRwKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBqb2JzQmFzZVVybCArICBpZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBpbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgaGVhZGVycywgaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoc3RhdHVzKTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblxuICAgICAgICB9LFxuXG5cbiAgICAgICAgZ2V0TGF0ZXN0OiBmdW5jdGlvbiBnZXRMYXRlc3Qob3B0aW9ucykge1xuXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG5cbiAgICAgICAgICAgICRodHRwKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBqb2JzQmFzZVVybCArICc/bGltaXQ9Jysgb3B0aW9ucy5saW1pdCArICcmb2Zmc2V0PScgKyBvcHRpb25zLm9mZnNldFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBpbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgaGVhZGVycywgaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoc3RhdHVzKTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblxuICAgICAgICB9XG4gICAgfVxuXG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGlzdWFyZXogb24gNC8xNy8yMDE0LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgcm9sZXM6IHtcblxuICAgICAgICBhZG1pbjogJ2FkbWluJyxcbiAgICAgICAgY29udHJhY3RvcjogJ0tvbnRyYWt0b3InLFxuICAgICAgICBjdXN0b21lcjogJ0t1bmRlJ1xuXG4gICAgfSxcblxuICAgIHNhbHV0YXRpb246IHtcblxuICAgICAgICBNcjogJ0hlcnInLFxuICAgICAgICBNcnM6ICdGcmF1JyxcbiAgICAgICAgTWlzczogJydcblxuICAgIH0sXG5cbiAgICAvL1Nob3VsZCBiZSB0cmFuc2xhdGVkXG4gICAgb3JkZXJUeXBlOiB7XG4gICAgICAgIHJlcGFpcjogJ0RhY2hyZXBhcmF0dXInLFxuICAgICAgICBjaGVjazogJ0RhY2hjaGVjaydcbiAgICB9LFxuXG4gICAgcm9vZlR5cGU6IHtcblxuICAgICAgICBzdGVlcDogJ1N0ZWlsZGFjaCcsXG4gICAgICAgIGZsYXQ6ICdGbGFjaGRhY2gnLFxuICAgICAgICBvdGhlcjogJ05pY2h0IGFuZ2VnZWJlbidcbiAgICB9LFxuXG4gICAgcHJvcGVydHlUeXBlOiB7XG4gICAgICAgIHNpbmdsZUZhbWlseTogJ0VpbiBiaXMgWndlaWZhbWlsaWVuIFdvaG5oYXVzJyxcbiAgICAgICAgbXVsdGlGYW1pbHk6ICdHcm9zc2VzIE1laHJmYW1pbGllbndvaG5oYXVzJyxcbiAgICAgICAgb3RoZXI6ICdBbmRlcmVzIEhhdXMnXG4gICAgfSxcblxuICAgIGNvbnRhY3RUeXBlOiB7XG4gICAgICAgIG93bmVyOiAnQmVzaXR6ZXIvaW4nLFxuICAgICAgICByZW50ZXI6ICdNaWV0ZXIvaW4nLFxuICAgICAgICBjb25jaWVyZ2U6ICdIYXVzbWVpc2VyL2luJyxcbiAgICAgICAgcm9vbW1hdGU6ICdNSXRiZXJ3b2huZXIvaW4nLFxuICAgICAgICBuZWlnaGJvdXI6ICdOYWNoYmFyL2luJ1xuICAgIH0sXG5cbiAgICBkaXN0YW5jZVR5cGU6IHtcblxuICAgICAgICBrbG06ICdLTScsXG4gICAgICAgIG1pbGVzOiAnbWlsZXMnXG4gICAgfSxcblxuICAgIGpvYlN0YXR1czoge1xuICAgICAgICB1bmtub3duIDogJ05pY2h0IGFuZ2VnZWJlbicsXG4gICAgICAgIGNyZWF0ZWQ6ICdFcnN0ZWxsdCcsXG4gICAgICAgIHJlcXVlc3RBY2NlcHRlZDogJ0FuZ2Vub21tZW4nLFxuICAgICAgICByZXF1ZXN0UmVqZWN0ZWQ6ICdBbmZyYWdlIEFiZ2VsZWhudCcgLFxuICAgICAgICB3b3JrU3RhcnRlZDogJ0dlc3RhcnRldCcsXG4gICAgICAgIHdvcmtDb21wbGV0ZWQ6ICdGZXJ0aWcnLFxuICAgICAgICB3b3JrUmVqZWN0ZWQ6ICdWb3IgT3J0IEFiZ2VsZWhudCdcbiAgICB9LFxuXG4gICAgcGF5bWVudFR5cGU6IHtcblxuICAgICAgICBjYXNoOidCYXInLFxuICAgICAgICBiYW5rVHJhbnNmZXI6ICdCYW5rIFRyYW5zZmVyJyxcbiAgICAgICAgYW1leDogJ0FtZXgnLFxuICAgICAgICB2aXNhOiAnVmlzYScsXG4gICAgICAgIG1hc3RlckNhcmQ6ICdNYXN0ZXJjYXJkJyxcbiAgICAgICAgZGlzY292ZXJDYXJkOiAnRGlzY292ZXInXG5cbiAgICB9LFxuXG4gICAgVW5pdE9mTWVhc3VyZToge1xuXG4gICAgICAgIFBpZWNlOiAnU3R1ZWNrJyxcbiAgICAgICAgTWV0ZXI6ICdNZXRlcicsXG4gICAgICAgIEN1YmljTWV0ZXI6ICdLdWJpayBNZXRlcidcbiAgICB9XG5cblxufTsiXX0=
