/**
 * Created by isuarez on 2/3/14.
 */



(function () {

    'use strict';
    var controllerId = 'JobCheckListCtrl';
    angular.module('rc.contractor').controller(controllerId, ['$location', 'config', 'contractorSvc', 'commonSvc', JobCheckListCtrl]);
    function JobCheckListCtrl($location, config, contractorSvc, commonSvc) {

        var vm = this;

        vm.editingCheckList = false;

      vm.showCheckList = function (checkListName) {

        var index = findIndex(vm.lists, checkListName);

        if (index) {
          vm.checkList = vm.list[index];
          vm.editingCheckList = true;
        }
      };


      vm.deleteCheckList = function (checkListName) {

        var index = findIndex(vm.lists, checkListName);

        if (index) {
           vm.list.splice(index, 1);
        }

      };

       function findIndex(list, name) {

         for (var i = 0, len = list.length; i < len; i++) {
           if (list[i].name === name)
              return i;
         }

         return -1;


       }

      vm.AddCheckList = function() {
        vm.job.checkList.push({name: vm.checkListName, description: vm.checkListDesc, content: {}});
        vm.cancelAddCheckList();

      };


      vm.cancelAddCheckList = function () {
       vm.checkListForm.$setPristine();
      };


      function onData(data) {
        vm.job = data;
        vm.lists = data.checkLists;
      }




      function saveJob() {

        commonSvc.saveData(config.endpoints.job.create, vm.job, 'PUT')
          .then(successReturn);


        function successReturn(response) {

          if (response.data) {
            commonSvc.logger.logSuccess(translation.orderSavedSuccess, response.data, 'CheckList', true  );
            //$location.path('/contractor/jobs');
          }


        }


      }



      function activate() {
            commonSvc.activateController([contractorSvc.getJob($routeParams.id).then(onData)], controllerId);
        }

        activate();


    }


})();


