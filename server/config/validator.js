/**
 * Created by isuarez on 4/9/2014.
 * This module will export common validators for mongoose
 */

var validate = require('mongoose-validator').validate;

module.exports = {

    nameValidator : [validate({message: "String should be between 3 and 50 characters"}, 'len', 2, 50)],
    emailValidator: [validate('isEmail', {passIfEmpty: true})],
    phoneValidator: [validate({passIfEmpty: true}, 'len',5,20 )]
        //[validate('matches','^([+][0-9]{1,3}[ .-])?([(]{1}[0-9]{1,6}[)])?([0-9 .-/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$','i')]

};

