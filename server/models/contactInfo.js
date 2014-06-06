/**
 * Created by isuarez on 4/16/2014.
 */

var path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator'));

    var schemaWithRequirements = {
        salutation: {type: String, trim: true},
        firstName: {type: String, required: true, trim: true, validate: validator.nameValidator},
        lastName: {type: String, required: true,trim: true, validate: validator.nameValidator},
        email: {type: String, required: true,trim: true, validate: validator.emailValidator},
        phone: {type: String, required: true,trim: true, validate: validator.phoneValidator}
    };

var rawSchema = {
    salutation: {type: String, trim: true},
    firstName: {type: String, trim: true, validate: validator.nameValidator},
    lastName: {type: String,trim: true, validate: validator.nameValidator},
    email: {type: String,trim: true, validate: validator.emailValidator},
    phone: {type: String,trim: true, validate: validator.phoneValidator}
};

module.exports = {
    Schema: schemaWithRequirements,
    Definition: rawSchema
};

