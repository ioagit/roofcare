/**
 * Created by cerker on 4/20/2014.
 */

//require User, Contractor, Customer


//exports.getInbox = function() {};


var path = require('path')
    ,lookups = require(path.join(process.cwd(), 'server', 'models', 'lookups'))
    ,Job = require(path.join(process.cwd(), 'server', 'models', 'Job')).Model
,Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model
    ,Address = require(path.join(process.cwd(), 'server', 'models', 'Address')).Model;






exports.getJobs = function() {

    return function (req, res) {

        Job.find({status:
                     {$nin: [lookups.jobStatus.created,
                             lookups.jobStatus.unknown,
                             lookups.jobStatus.workRejected ] }

                  })
            .populate('Customer')
            .populate('WorkSite')
            .exec(function (err, collection) {

                res.send(JSON.stringify(collection));

            } // End Exec Callback
        ); //Close Exec function
    };
};
