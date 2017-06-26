angular
    .module('app')
    .controller('adminallappCtrl', adminallappCtrl);

adminallappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function adminallappCtrl($rootScope, $scope, $state, HTTPService) {
    
    $scope.options = {
        responsive: true
    }
    
    function loadAllAppList() {
        HTTPService.getAllApp().then(function (res) {
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

    loadAllAppList();

    $scope.showApplication = function (aid) {
        $state.go('app.singleapplication', { id: aid });
    }

}