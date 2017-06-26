angular
    .module('app')
    .controller('adminapproveappCtrl', adminapproveappCtrl);

adminapproveappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function adminapproveappCtrl($rootScope, $scope, $state, HTTPService) {

    $scope.options = {
        responsive : true
    }

    function loadApproveAppList() {
        HTTPService.getApprovedApp().then(function (res) {
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

    loadApproveAppList();

    $scope.showApplication = function (aid) {
        $state.go('app.singleapplication', { id: aid });
    }

}