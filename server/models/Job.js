/**
 * Created by christophererker on 4/20/2014.
 */

// Job Model
var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    extend = require('mongoose-schema-extend'),
    BaseSchema = require(path.join(process.cwd(), 'server', 'models', 'BaseSchema')),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    physicalAddress = require(path.join(process.cwd(), 'server', 'models', 'Address')),
    contactInfo = require(path.join(process.cwd(), 'server', 'models', 'contactInfo'));

var onSiteContact = contactInfo.Definition;
onSiteContact.cell = {type: String, trim: true, validate: validator.phoneValidator};
onSiteContact.contactType = {type: String, trim: true};

var customer = contactInfo.Definition;
customer.company = {type: String, trim: true};
customer.industry = {type: String, trim: true};
customer.department = {type: String, trim: true};
customer.address = physicalAddress.Definition;

var schema =  BaseSchema.extend({
    contractor: {type : mongoose.Schema.ObjectId, ref : 'Contractor'},

    customer: customer,
    onSiteContact: onSiteContact,

    startDate: {type: Date},
    workStarted: {type: Date},
    workCompleted: {type: Date},


    duration: {type: String},
    status: {type: String, required:true},


    orderType: {type: String, required:true},
    propertyType: {type: String, default: lookUps.propertyType.singleFamily },
    roofType: { type: String, default: lookUps.roofType.steep },
    userConfirmedInfo: { type: Boolean, default: false },

    workSite: physicalAddress.Definition,

    mapUrl: {type: String},

    invoice: {
        number: {type: String, required:true},
        travelCharge: {type: Number},
        fixedPrice: {type: Number}
    },
    distance: {type: Number},

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

schema.virtual('customer.fullProperName')
    .get(function() {
        var sal = '';
        if (this.customer.salutation) {
            sal = this.customer.salutation + '.';
        }

        return sal + ' ' + this.customer.firstName + ' ' + this.customer.lastName
    });

schema.set({
    toObject: { virtuals: true },
    toJSON: { getters: true, virtuals: true }
});

schema.statics.Filter = function(query, criteria, processQuery) {
    //http://mongoosejs.com/docs/2.7.x/docs/query.html

    if (criteria === undefined || criteria === null) return query;

    if ((criteria['status'] || '').length > 0)
        query = query.where('status', criteria.status);

    if ((criteria['customer'] || '').length > 0) {
        query = query.and([{
                $or:[ {'customer.firstName': criteria.customer},  {'customer.lastName': criteria.customer} ]
            }]);
    }
    processQuery(query);
};

schema.statics.NextInvoiceNumber = function(callback) {
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
        .in([lookUps.jobStatus.responsePending,
            lookUps.jobStatus.requestRejected,
            lookUps.jobStatus.workRejected ]);
};

module.exports = {
    Model: mongoose.model('Job', schema),
    Schema : schema
};