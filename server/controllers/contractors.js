/**
 * Created by christophererker on 5/3/14.
 */

var path = require('path'),
    async = require('async'),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address')).Model,
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
    Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model,
    Job = require(path.join(process.cwd(), 'server', 'models', 'Job')).Model;

exports.getDashboard = function() {
    return function (req, res) {

        var acceptedRequests = [
            {
                id: '111111',
                StartDate: '05-03-2014 3:00PM',
                Status: lookUps.jobStatus.requestAccepted,
                WorkSite: {
                    Street: '',
                    City: ''
                },
                OnSiteContact: {
                    salutation: 'Mr',
                    firstName: 'Sabine',
                    lastName: 'Flesch',
                    email: 'kunde@kunde.com',
                    phone: ' (101) 123456-111'
                }
            },
            {
                id: '222222',
                StartDate: '05-04-2014 11:00AM',
                Status: lookUps.jobStatus.requestAccepted,
                OnSiteContact: {
                    salutation: 'Mr',
                    firstName: 'Sepp',
                    lastName: 'Maier',
                    email: 'kunde@kunde.com',
                    phone: ' (101) 123456-111'
                }
            }];

        var dashBoard = {
            inbox: {
                request: 3,
                total: 6,
                next: acceptedRequests[0]

            },
            jobs: {
                completed: 3,
                started: 3,
                rejected: 2
            },
            comingUp: acceptedRequests
        };
        res.send(JSON.stringify(dashBoard));
    };
};