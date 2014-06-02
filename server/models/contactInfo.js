/**
 * Created by isuarez on 4/16/2014.
 */

var path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator'));

module.exports = {

    salutation: {type: String, trim: true},
    firstName: {type: String, required: true, trim: true, validate: validator.nameValidator},
    lastName: {type: String, required: true,trim: true, validate: validator.nameValidator},
    email: {type: String, required: true,trim: true, validate: validator.emailValidator},
    phone: {type: String, required: true,trim: true, validate: validator.phoneValidator}
};