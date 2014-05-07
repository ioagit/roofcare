/**
 * Created by isuarez on 2/3/14.
 */

module.exports = function rooferDashboardCtrl($scope, dashboardSvc) {

    $scope.getDashboard = function() {

        $scope.data =  dashboardSvc.dashboard();
        $scope.data.then(function(data) {
            $scope.dashboard = data;
            $scope.nextJob = getNextEvent();
        });

    };

    //Run
    $scope.getDashboard();

    function getNextEvent() {

        if ($scope.dashboard.length === 0)
            return;

        return $scope.dashboard.comingUp[0];

    }


};

