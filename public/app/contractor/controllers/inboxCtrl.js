/**
 * Created by isuarez on 2/3/14.
 */



(function () {

    'use strict';
    var controllerId = 'ContractorInboxCtrl';
    angular.module('rc.contractor').controller(controllerId, ['$location', 'config', 'contractorSvc', 'commonSvc', 'spinner', ContractorInboxCtrl]);
    function ContractorInboxCtrl($location, config, contractorSvc, commonSvc, spinner) {

        var vmJobs = this;

        //Init var

        vmJobs.offset = 0;
        vmJobs.rows = [];
        vmJobs.totalFound = 0;

        var limit = config.pagination.limit;



        vmJobs.getLatest = function() {



            vmJobs.data =  contractorSvc.getLatestInbox({limit: limit, offset: vmJobs.offset });
            vmJobs.data.then(function(data) {
                vmJobs.rows = vmJobs.rows.concat(data.rows);
                vmJobs.totalFound = data.totalFound;
            });
        };

        vmJobs.loadMore = function() {
            vmJobs.offset += config.pagination.limit;
            vmJobs.getLatest();
        };

        vmJobs.moreAvailable = function() {
            return vmJobs.totalFound > vmJobs.offset + limit;
        };

        vmJobs.openInbox = function openInbox(id) {
            $location.path('/contractor/inbox_detail/' + id);
        };



        function activate() {
            commonSvc.activateController([vmJobs.getLatest()], controllerId);
        }

        activate();


    }


})();


