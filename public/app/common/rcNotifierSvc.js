/**
 * Created by isuarez on 3/20/14.
 */

angular.module('app').value('rfToastr', toastr);

angular.module('app').factory('rcNotifierSvc', function(rfToastr) {
    return {
        notify: function(msg) {
            rfToastr.success(msg);
            console.log(msg);
        },

        error: function(msg) {
            rfToastr.error(msg);
            console.error(msg);
        }
    }
});
