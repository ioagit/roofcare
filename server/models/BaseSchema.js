/**
 * Created by isuarez on 4/17/2014.
 */

var mongoose = require('mongoose')

var BaseSchema = new mongoose.Schema({

    created : {  type : Date,  default : Date.now }

})

module.exports = BaseSchema;

