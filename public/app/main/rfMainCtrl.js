'use strict';


app.controller('rfMainCtrl', function($scope) {

    $scope.courses = [
        {name: "Course 1 ", featured: true, published: new Date('2000/01/01')},
        {name: "Course 2 ", featured: false, published: new Date('2001/04/03')},
        {name: "Course 3 ", featured: true, published: new Date('2002/08/05')},
        {name: "Course 4 ", featured: true, published: new Date('2003/03/06')},
        {name: "Course 5 ", featured: true, published: new Date('2004/12/01')},
        {name: "Course 6 ", featured: true, published: new Date('2005/09/20')},
        {name: "Course 7 ", featured: true, published: new Date('2006/04/18')},
        {name: "Course 8 ", featured: true, published: new Date('2007/06/30')}
    ]

} );
