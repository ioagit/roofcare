/**
 * Created by isuarez on 2/3/14.
 */

module.exports = function rooferJobCtrl($scope, jobResource) {

       $scope.jobs = jobResource.query();

}
