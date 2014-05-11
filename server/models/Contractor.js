/**
 * Created by isuarez on 4/17/2014.
 */

// Contractor Model
var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    extend = require('mongoose-schema-extend'),
    UserSchema = require(path.join(process.cwd(), 'server', 'models', 'Users')).Schema,
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address')).Model;

var schema =  UserSchema.extend({
    address: { type : mongoose.Schema.ObjectId, ref : 'Property' },
    distanceCharge: {type: Number, required: false}
});

schema.statics.FindClosest = function(coordinates, callback)
{
    Address.aggregate([
        {
            $geoNear: {
                near: coordinates,
                distanceField: "distance",
                maxDistance: 50,
                spherical: false,
                distanceMultiplier: 112,
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
}