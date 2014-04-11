/**
 * Created by cerker on 4/11/14.
 */

var mongoose  = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator'));

var buildingSchema = new mongoose.Schema({
    latitude: {type: Number, required:true},
    longitude: {type: Number, required:true}
});

