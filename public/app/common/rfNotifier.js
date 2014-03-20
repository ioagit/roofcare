/**
 * Created by isuarez on 3/20/14.
 */

angular.module('app').value('rfToastr', toastr);

angular.module('app').factory('rfNotifier', function(rfToastr) {
    return {
        notify: function(msg) {
            rfToastr.success(msg);
            console.log(msg);
        }
    }
});
