angular
    .module('app')
    .controller('admindashboardCtrl', admindashboardCtrl);

admindashboardCtrl.$inject = ['$rootScope', '$scope', '$state', 'AuthFactory', 'HTTPService', '$location'];
function admindashboardCtrl($rootScope, $scope, $state, AuthFactory, HTTPService, $location) {

    //alert($location.absUrl());

    $scope.all = 0;
    $scope.new = 0;
    $scope.amend = 0;
    $scope.reject = 0;
    $scope.approve = 0;
    $scope.resubmit = 0;

    HTTPService.getAllAppCount().then(function (res) {
        //console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].status_id != 8 && res.data[i].status_id != 7) {
                $scope.all = $scope.all + parseInt(res.data[i].total);
                if (res.data[i].status_id == 1) {
                    $scope.new = res.data[i].total;
                } else if (res.data[i].status_id == 2) {
                    $scope.amend = res.data[i].total;
                } else if (res.data[i].status_id == 4) {
                    $scope.approve = res.data[i].total;
                } else if (res.data[i].status_id == 5) {
                    $scope.reject = res.data[i].total;
                } else {

                }
            }
        }
    }, function (err) {
        console.log(err);
        if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
            HTTPService.logout();
            alert("Session Expired...");
        }
    });

    HTTPService.getResubmitApp().then(function (res) {
        $scope.resubmit = res.data.length;
    }, function (err) {
        console.log(err);
        if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
            HTTPService.logout();
            alert("Session Expired...");
        }
    });

    $scope.gotoAllApplication = function () {
        $state.go('app.adminapplication.allapp');
    }

    $scope.gotoNewApplication = function () {
        $state.go('app.adminapplication.newapp');
    }

    $scope.gotoAmendApplication = function () {
        $state.go('app.adminapplication.amendapp');
    }

    $scope.gotoRejectApplication = function () {
        $state.go('app.adminapplication.rejectapp');
    }

    $scope.gotoApproveApplication = function () {
        $state.go('app.adminapplication.approveapp');
    }

    $scope.gotoResubmitApplication = function () {
        $state.go('app.adminapplication.resubmissionapp');
    }

}