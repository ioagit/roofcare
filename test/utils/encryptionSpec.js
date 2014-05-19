
var expect = require("chai").expect,
    crypto = require('../../server/utils/encryption.js');

describe('Module - Encryption', function () {

    it('should create salt that is at least 20 char long', function() {

        var salt = crypto.createSalt();
        expect(salt).to.have.length.of.at.least(20);
    });

    it('should return as hashed password that is at least 20 char long', function() {

        var salt = crypto.createSalt();
        var pwd = crypto.hashPwd(salt, "testpwd");
        expect(pwd).to.have.length.of.at.least(20);
    });

});