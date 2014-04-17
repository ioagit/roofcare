/**
 * Created by isuarez on 3/28/2014.
 */

var mongoose = require('mongoose'),
    path = require('path'),
    encrypt = require(path.join(process.cwd(), 'server', 'utils', 'encryption')),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    contactInfo = require(path.join(process.cwd(), 'server', 'models', 'contactInfo'));

var userSchema = new mongoose.Schema({
        contactInfo: contactInfo,
        //firstName: {type: String, required: true, trim: true, validate: validator.nameValidator},
        //lastName: {type: String, required: true,trim: true, validate: validator.nameValidator},
        username: {type: String, required: '{PATH} is required!', unique: true},
        salt: {type: String, required: '{PATH} is required!'},
        hashed_pwd: {type: String, required: '{PATH} is required!'},
        roles: [String]});

userSchema.methods = {

    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > -1;
    },
    isAdmin: function () {
        return this.hasRole('admin');
    },
    isContractor: function () {
        return this.hasRole('contractor');
    },
    isUser: function () {
        return this.hasRole('user') || this.roles.length === 0;
    }
};

var _model = mongoose.model('User', userSchema);
module.exports.Model = _model;
