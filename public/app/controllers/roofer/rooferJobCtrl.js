/**
 * Created by isuarez on 2/3/14.
 */

angular.module('App.Controllers').controller('rooferJobCtrl',  function($scope, jobResource) {


        $scope.jobs = jobResource.query();



});
