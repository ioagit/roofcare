/**
 * Created by isuarez on 4/17/2014.
 */

// Contractor Model
var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    extend = require('mongoose-schema-extend'),
    UserSchema = require(path.join(process.cwd(), 'server', 'models', 'Users')).Schema,
    physicalAddress = require(path.join(process.cwd(), 'server', 'models', 'Address'));

var schema =  UserSchema.extend({
    address: physicalAddress.Definition,
    distanceCharge: {type: Number}
});

schema.virtual('address.latitude')
    .get(function() { return this.address.coordinates[1]; })
    .set(function(val) { this.address.coordinates[1] = val; });

schema.virtual('address.longitude')
    .get(function(){ return this.address.coordinates[0];})
    .set(function(val) { this.address.coordinates[0] = val; });

schema.methods.getFormattedAddress =  function() { physicalAddress.GetFormattedAddress(this.address); };

schema.statics.FindClosest = function(locCoordinates, callback) {
    this.aggregate([
        {
            $geoNear: {
                near: locCoordinates,
                distanceField: "distance",
                maxDistance: 0.50,
                spherical: true,
                distanceMultiplier: (3959 * 1.609344),
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