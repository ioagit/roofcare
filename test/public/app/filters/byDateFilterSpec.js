/**
 * Created by isuarez on 5/5/14.
 */

var should = require('should')
    ,expect = require("chai").expect
    ,path = require('path');

var byDateFilter = require(path.join(process.cwd(), 'public', 'app', 'filters', 'byDateFilter'))();

describe('By Date Filter', function() {

    var jobs;

    beforeEach(function() {

        //Prepare a fake list of jobs
        //Date format is in mm/dd/yyyy
        jobs = [{id: 2, StartDate: '01/01/2014'}, {id: 2, StartDate: '01/02/2014'}, {id: 2, StartDate: '01/03/2014'}];


    })

    it('should return only one item for the 01/02/2014 date', function() {

        var resultList = byDateFilter(jobs, new Date('01/02/2014'));
        expect(resultList.length).to.equal(1);
        expect(resultList[0].id).to.equal(2);

    });

    it('should return have no item for undefined date parameter', function() {

        var resultList = byDateFilter(jobs);
        expect(resultList.length).to.equal(0);

    });

    it('should return the same job list when job is undefined or length is 0', function() {

        var resultList = byDateFilter([]);
        expect(resultList.length).to.equal(0);

    })

});

