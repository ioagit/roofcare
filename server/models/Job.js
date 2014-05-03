/**
 * Created by cerker on 4/20/2014.
 */

// Job Model
var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    extend = require('mongoose-schema-extend'),
    BaseSchema = require(path.join(process.cwd(), 'server', 'models', 'BaseSchema')),
    contactInfo = require(path.join(process.cwd(), 'server', 'models', 'contactInfo')),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups'));

var schema =  BaseSchema.extend
({
    Contractor: {type : mongoose.Schema.ObjectId, ref : 'Contractor'},
    Customer: {type : mongoose.Schema.ObjectId, ref : 'Customer'},
    OnSiteContact: contactInfo,
    StartDate: {type: Date, required:true},
    Status: {type: String, required:true},
    OrderType: {type: String, required:true},
    RoofType: {type: String, required:true},
    WorkSite:  {type : mongoose.Schema.ObjectId, ref : 'Address'}
});

function applyCriteria(query, criteria)
{
    // http://mongoosejs.com/docs/2.7.x/docs/query.html

    if (criteria === undefined || criteria === null) return query;

    if ((criteria['status'] || '').length > 0)
        query = query.where('Status', criteria.status);

    return query;
}
schema.statics.QueryJobs = function(criteria) {

    return applyCriteria(this
            .find({})
            .where('Status')
            .in([lookUps.jobStatus.requestAccepted,
                lookUps.jobStatus.workStarted,
                lookUps.jobStatus.workCompleted ]),
        criteria);
};

schema.statics.QueryRequests = function(criteria) {
    //Inbox
    return applyCriteria(this
            .find({})
            .where('Status')
            .in([lookUps.jobStatus.created,
                lookUps.jobStatus.requestRejected,
                lookUps.jobStatus.workRejected ]),
        criteria);
};

module.exports = {
    Model: mongoose.model('Job', schema),
    Schema : schema
}