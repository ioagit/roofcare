/**
 * Created by isuarez on 4/17/2014.
 */

// Contractor Model
var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    extend = require('mongoose-schema-extend'),
    UserSchema = require(path.join(process.cwd(), 'server', 'models', 'Users')).Schema,
    addresses = require(path.join(process.cwd(), 'server', 'models', 'Address'));

var Address = addresses.Model;
var addressDefinition = addresses.Definition;

var schema =  UserSchema.extend({
    address: addressDefinition,
    distanceCharge: {type: Number, required: false}
});

schema.virtual('address.latitude')
    .get(function() { return this.address.coordinates[1]; })
    .set(function(val) { this.address.coordinates[1] = val; });

schema.virtual('address.longitude')
    .get(function(){ return this.address.coordinates[0];})
    .set(function(val) { this.address.coordinates[0] = val; });

schema.methods.getFormattedAddress =  function() {
    var address = util.format('%s %s', this.address.street, this.address.city);
    if (this.address.state != null && this.address.state != "") address += ' ' + this.address.state;
    if (this.address.country != null && this.address.country != "") address += ' ' + this.address.country;
    address += ' ' + this.address.zipCode;
    return address;
};
schema.statics.FindClosest = function(locCoordinates, callback) {
    this.aggregate([
        {
            $geoNear: {
                near: locCoordinates,
                distanceField: "distance",
                maxDistance: 50,
                spherical: true, distanceMultiplier: 6371,
                includeLocs: "address.coordinates",
                num: 1
            }
        }
    ], callback);
};

schema.set('toJSON', { getters: true, virtuals: false });

var model = mongoose.model('Contractor', schema);

module.exports = {
    Model: model,
    Schema : schema
};