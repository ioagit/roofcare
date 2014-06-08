/**
 * Created by christophererker on 5/3/14.
 */

var path = require('path'),
    async = require('async'),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address')).Model,
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
    Job = require(path.join(process.cwd(), 'server', 'models', 'Job')).Model;

exports.getDashboard = function() {
    return function (req, res) {

        var dashBoard = {
            comingUp: [],
            inbox: {
                nextJob: null,
                request: 0,
                total: 0
            },
            jobs: {
                completed :0,
                started: 0,
                rejected: 0
            }
        };

        var user = req.user;
        var now = new Date();
        var start = now.toDateString();
        now.setDate(now.getDate() + 14);
        var end = now.toDateString();

        async.series(
            [
                function (callback) {
                    Job.find(
                        {
                            'contractor': user.id,
                            'startDate':  {"$gte": start, "$lt": end},
                            'status': lookUps.jobStatus.requestAccepted
                        })
                        .sort('startDate')

                        .exec(function (err, coll) {
                            dashBoard.inbox.nextJob = coll[0];
                            dashBoard.comingUp = coll;
                            callback();
                        });
                },
                function (callback) {

                    Job
                        .aggregate({$group: {_id: {status: '$status'}, count: {$sum: 1}}})
                        .exec(function (err, groupings) {
                            for(var i=0; i < groupings.length; i++) {
                                var status = groupings[i]._id.status;
                                var count = groupings[i].count;

                                switch (status) {
                                    case lookUps.jobStatus.responsePending:
                                        dashBoard.inbox.request = count;
                                        break;

                                    case lookUps.jobStatus.requestAccepted:
                                        dashBoard.inbox.total = count;
                                        break;

                                    case lookUps.jobStatus.workCompleted:
                                        dashBoard.jobs.completed = count;
                                        break;

                                    case lookUps.jobStatus.workStarted:
                                        dashBoard.jobs.started = count;
                                        break;

                                    case lookUps.jobStatus.workRejected:
                                        dashBoard.jobs.rejected = count;
                                        break;
                                } // end switch
                            } //end for
                            dashBoard.inbox.total += dashBoard.inbox.request;
                            callback();
                        });
                }
            ],
            function (err, results) {
                if (err || !results) { }
                if (results.length) {
                    res.send(JSON.stringify(dashBoard));
                }
            });
    };
};