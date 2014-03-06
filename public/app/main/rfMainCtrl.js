'use strict';


app.controller('rfMainCtrl', function($scope) {

    $scope.courses = [
        {mame: "Course 1 ", featured: true, published: new Date('2000/01/01')},
        {mame: "Course 2 ", featured: true, published: new Date('2001/01/01')},
        {mame: "Course 3 ", featured: true, published: new Date('2002/01/01')},
        {mame: "Course 4 ", featured: true, published: new Date('2003/01/01')},
        {mame: "Course 5 ", featured: true, published: new Date('2004/01/01')},
        {mame: "Course 6 ", featured: true, published: new Date('2005/01/01')},
        {mame: "Course 7 ", featured: true, published: new Date('2006/01/01')},
        {mame: "Course 8 ", featured: true, published: new Date('2007/01/01')}
    ]

} );
