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
