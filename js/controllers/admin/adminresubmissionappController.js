angular
    .module('app')
    .controller('adminresubmissionappCtrl', adminresubmissionappCtrl);

adminresubmissionappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function adminresubmissionappCtrl($rootScope, $scope, $state, HTTPService) {

    $scope.options = {
        responsive: true
    }

    function loadResubmitAppList() {
        HTTPService.getResubmitApp().then(function (res) {
            $scope.appList = res.data;
        }, function (err) {
            console.log(err);
            if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
                HTTPService.logout();
                alert("Session Expired...");
            }
        });
    }

    $scope.appList = {};

    loadResubmitAppList();

    $scope.showApplication = function (aid) {
        $state.go('app.singleapplication', { id: aid });
    }

}