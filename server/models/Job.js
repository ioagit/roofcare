/**
 * Created by cerker on 4/20/2014.
 */

// Job Model
var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    extend = require('mongoose-schema-extend'),
    BaseSchema = require(path.join(process.cwd(), 'server', 'models', 'BaseSchema'));

var schema =  BaseSchema.extend
({
    Contractor: {type : mongoose.Schema.ObjectId, ref : 'Contractor'},
    Customer: {type : mongoose.Schema.ObjectId, ref : 'Customer'},
    OnSiteContact: {type : mongoose.Schema.ObjectId, ref : 'ContactInfo'},
    StartDate: {type: Date, required:true},
    Status: {type: String, required:true},
    WorkSite:  {type : mongoose.Schema.ObjectId, ref : 'Address'}
});

module.exports = {
    Model: mongoose.model('Job', schema),
    Schema : schema
}