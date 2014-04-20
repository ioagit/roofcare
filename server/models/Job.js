/**
 * Created by cerker on 4/20/2014.
 */

// Job Model
var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    extend = require('mongoose-schema-extend'),
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address')),
    ContactInfo = require(path.join(process.cwd(), 'server', 'models', 'contactInfo')),
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')),
    Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')),
    BaseSchema = require(path.join(process.cwd(), 'server', 'models', 'BaseSchema'));

var schema =  BaseSchema.extend
({
    Contractor: Contractor.Schema,
    Customer: Customer.Schema,
    OnSiteContact: ContactInfo.Schema,
    StartDate: {type: Date, required:true},
    Status: {type: String, required:true},
    WorkSite: Address.Schema
});

module.exports = {
    Model: mongoose.model('Job', schema),
    Schema : schema
}