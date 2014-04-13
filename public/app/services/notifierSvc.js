/**
 * Created by isuarez on 3/20/14.
 */

angular.module('App.Services').value('rcToastr', toastr);

angular.module('App.Services').factory('notifierSvc', function(rcToastr) {
    return {
        notify: function(msg) {
            rcToastr.success(msg);
            console.log(msg);
        },

        error: function(msg) {
            rcToastr.error(msg);
            console.error(msg);
        }
    }
});
