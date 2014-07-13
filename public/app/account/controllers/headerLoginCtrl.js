/**
 * Created by isuarez on 4/10/2014.
 */

'use strict';

(function() {

    'use strict';
    var controllerId = 'HeaderLoginCtrl';
    angular.module('rc.account').controller(controllerId, ['$window',  'identitySvc','authSvc',
        HeaderLoginCtrl]);

    function HeaderLoginCtrl($window,  identitySvc, authSvc ) {

        var vm = this;

        if (!identitySvc.currentUser) {
          $window.location.href = '/login';
        }

        vm.identity = identitySvc;


        vm.signout = function() {


                authSvc.logoutUser().then(function() {
                  $window.location.href = '/login';
                })
            }


    }


})();
