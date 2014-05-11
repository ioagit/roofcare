/**
 * Created by christophererker on 4/20/2014.
 */

// Job Model
var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    extend = require('mongoose-schema-extend'),
    BaseSchema = require(path.join(process.cwd(), 'server', 'models', 'BaseSchema')),
    contactInfo = require(path.join(process.cwd(), 'server', 'models', 'contactInfo')),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model;

var schema =  BaseSchema.extend
({
    Contractor: {type : mongoose.Schema.ObjectId, ref : 'Contractor'},
    Customer: {type : mongoose.Schema.ObjectId, ref : 'Customer'},
    OnSiteContact: contactInfo,
    StartDate: {type: Date, required:true},
    Status: {type: String, required:true},
    OrderType: {type: String, required:true},
    RoofType: {type: String, required:true},
    PropertyType: {type: String, required:true},
    WorkSite:  {type : mongoose.Schema.ObjectId, ref : 'Address'},
    CustomerNotes: {type: String, required:false},
    ContractorNotes: {type: String, required:false}
});


schema.statics.Filter = function(query, criteria, processQuery) {
    //http://mongoosejs.com/docs/2.7.x/docs/query.html

    if (criteria === undefined || criteria === null) return query;

    if ((criteria['status'] || '').length > 0)
        query = query.where('Status', criteria.status);

    if ((criteria['customer'] || '').length > 0)
    {
        Customer.FindByFirstOrLastName(criteria.customer, function(customers){
            var customerIds = [];
            for(var i=0; i< customers.length; i++) {
                customerIds.push(customers[i].id);
            }
            query = query.where('Customer').in(customerIds);
            processQuery(query);
        });
    }
    else
        processQuery(query);
};
schema.statics.QueryJobs = function(contractorId) {
    return this
        .find({Contractor: contractorId})
        .where('Status')
        .in([lookUps.jobStatus.requestAccepted,
            lookUps.jobStatus.workStarted,
            lookUps.jobStatus.workCompleted ]);
};
schema.statics.QueryInbox = function(contractorId) {
    return this
        .find({Contractor: contractorId})
        .where('Status')
        .in([lookUps.jobStatus.created,
            lookUps.jobStatus.requestRejected,
            lookUps.jobStatus.workRejected ]);
};


module.exports = {
    Model: mongoose.model('Job', schema),
    Schema : schema
}