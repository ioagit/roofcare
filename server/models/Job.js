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
    physicalAddress = require(path.join(process.cwd(), 'server', 'models', 'Address')),
    Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model;

var schema =  BaseSchema.extend({
    contractor: {type : mongoose.Schema.ObjectId, ref : 'Contractor'},
    customer: {type : mongoose.Schema.ObjectId, ref : 'Customer'},
    onSiteContact: contactInfo,
    startDate: {type: Date, required:true},
    status: {type: String, required:true},

    orderType: {type: String, required:true},
    propertyType: {type: String, default: lookUps.propertyType.singleFamily },
    roofType: { type: String, default: lookUps.roofType.steep },

    workSite: physicalAddress.Definition,

    invoice: {
        number: {type: String, required:true},
        distanceCharge: {type: Number, required:true},
        fixedPrice: {type: Number, required:true}
    },

    notes : {
        customer: {type: String, required:false},
        contractor: {type: String, required:false}
    }
});

schema.virtual('workSite.latitude')
    .get(function() { return this.workSite.coordinates[1]; })
    .set(function(val) { this.workSite.coordinates[1] = val; });

schema.virtual('workSite.longitude')
    .get(function(){ return this.workSite.coordinates[0];})
    .set(function(val) { this.workSite.coordinates[0] = val; });

schema.virtual('invoice.total')
    .get(function() { return this.invoice.distanceCharge + this.invoice.fixedPrice; });

schema.methods.getFormattedAddress =  function() { physicalAddress.GetFormattedAddress(this.workSite); };

schema.set('toJSON', { getters: true, virtuals: false });

schema.statics.Filter = function(query, criteria, processQuery) {
    //http://mongoosejs.com/docs/2.7.x/docs/query.html

    if (criteria === undefined || criteria === null) return query;

    if ((criteria['status'] || '').length > 0)
        query = query.where('status', criteria.status);

    if ((criteria['customer'] || '').length > 0)
    {
        Customer.FindByFirstOrLastName(criteria.customer, function(customers){
            var customerIds = [];
            for(var i=0; i< customers.length; i++) {
                customerIds.push(customers[i].id);
            }
            query = query.where('customer').in(customerIds);
            processQuery(query);
        });
    }
    else
        processQuery(query);
};

schema.statics.NextInvoiceNumber = function(callback)
{
    this.findOne()
        .sort('-invoice.number')
        .exec(function(err, doc)
        {
            var max = parseInt(doc.invoice.number.slice(2)) + 1;
            callback('RC' + ("00000000" + max).slice(-8));
        });
};
schema.statics.QueryJobs = function(contractorId) {
    return this
        .find({contractor: contractorId})
        .where('status')
        .in([lookUps.jobStatus.requestAccepted,
            lookUps.jobStatus.workStarted,
            lookUps.jobStatus.workCompleted ]);
};
schema.statics.QueryInbox = function(contractorId) {
    return this
        .find({contractor: contractorId})
        .where('status')
        .in([lookUps.jobStatus.created,
            lookUps.jobStatus.requestRejected,
            lookUps.jobStatus.workRejected ]);
};

module.exports = {
    Model: mongoose.model('Job', schema),
    Schema : schema
};