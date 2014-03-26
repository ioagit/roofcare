describe('rcUser', function() {
   beforeEach(module('app'));

   describe('isAdmin', function() {
       it('should return false if the roles array does not contain admin entry', function(rcUser) {
           var user = new rcUser();
           user.roles = ['not admin'];
           expect(user.isAdmin()).to.be.falsey;
       } );
       it('should return true if the roles array does  contain admin entry', inject(function(rcUser) {
           var user = new rcUser();
           user.roles = ['admin'];
           expect(user.isAdmin()).to.be.true;
       } ));
   });
});