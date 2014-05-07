/**
 * Created by isuarez on 2/3/14.
 */

var config = require('app_config');

module.exports = function rooferJobStartCtrl($scope, $routeParams, jobSvc) {


      //Init var

    $scope.getJob = function getJob() {



        $scope.data =  jobSvc.getJob($routeParams.id);
        $scope.data.then(function(data) {
            $scope.job =   data;
        });

    };



       $scope.getJob();

}
