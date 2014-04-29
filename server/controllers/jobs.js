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

        var startingIndex = req.param('startIndex') || 0;
        var pageSize = req.param('pageSize') || 10;
        Job.find({Status:
                     {$nin: [lookups.jobStatus.created,
                             lookups.jobStatus.unknown,
                             lookups.jobStatus.workRejected ] }

                  })
            .skip(startingIndex)
            .limit(pageSize)
            .populate('Customer')
            .populate('WorkSite')
            .exec(function (err, collection) {

                res.send(JSON.stringify(collection));

            } // End Exec Callback
        ); //Close Exec function
    };
};
