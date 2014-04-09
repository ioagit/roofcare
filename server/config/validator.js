/**
 * Created by isuarez on 4/9/2014.
 * This module will export common validators for mongoose
 */

var validate = require('mongoose-validator').validate;

module.exports = {
    nameValidator : [validate({message: "String should be between 3 and 50 characters"}, 'len', 2, 50), validate('isAlphanumeric')]

};

