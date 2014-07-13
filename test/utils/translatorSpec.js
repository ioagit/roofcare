var path = require('path'),
    expect = require("chai").expect,
    translation = require(path.join(process.cwd(), 'server', 'translation','de-de' ));

describe('Module - Translation', function () {

    it('should properly format a date in german', function() {
        var day = new Date('07/13/2014 12:29');

        var formatted = translation.formatDate(day);

        expect(formatted).to.eq('13. Jul. 2014 12:29 Uhr')
    });

});