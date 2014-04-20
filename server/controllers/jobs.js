/**
 * Created by cerker on 4/20/2014.
 */

//require User, Contractor, Customer


//exports.getInbox = function() {};

exports.getJobs = function() {

    return function (req, res) {

        Job.find({}).exec(function (err, collection) {

                res.send(collection);

            } // End Exec Callback
        ); //Close Exec function
    };
};
