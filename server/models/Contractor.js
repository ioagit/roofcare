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

schema.statics.FindClosest = function(locCoordinates, callback)
{
    this.aggregate([
        {
            $geoNear: {
                near: locCoordinates,
                distanceField: "distance",
                maxDistance: 50,
                spherical: true, distanceMultiplier: 6371,
                //spherical: false, distanceMultiplier: 112,
                includeLocs: "address.Coordinates",
                num: 1
            }
        }
    ], callback);
};

var model = mongoose.model('Contractor', schema);

module.exports = {
    Model: model,
    Schema : schema
};