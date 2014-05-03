/**
 * Created by cerker on 4/20/2014.
 */

//require User, Contractor, Customer


//exports.getInbox = function() {};


var path = require('path')
    ,lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups'))
    ,Job = require(path.join(process.cwd(), 'server', 'models', 'Job')).Model
    ,Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model
    ,Address = require(path.join(process.cwd(), 'server', 'models', 'Address')).Model;

exports.getJobs = function() {

    return function (req, res) {

        var startingIndex = req.param('startIndex') || 0;
        var pageSize = req.param('pageSize') || 10;
        var name = req.param('customer') || '';

        // http://mongoosejs.com/docs/2.7.x/docs/query.html
        var query = Job.find({});
        query = query
                .where('Status')
                .nin([lookUps.jobStatus.created, lookUps.jobStatus.unknown, lookUps.jobStatus.workRejected ]);

        if(name !== '')
            query = query.or([
                {'Customer.contactInfo.firstName':name},
                {'Customer.contactInfo.lastName':name} ]);

        query
            .skip(startingIndex)
            .limit(pageSize)
            .populate('Customer')
            .populate('WorkSite')
            .exec(function (err, collection) {
                var r = JSON.stringify(collection);
                res.send(r);
            } // End Exec Callback
        ); //Close Exec function
    };
};
