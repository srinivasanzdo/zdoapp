angular
    .module('app')
    .controller('adminamendappCtrl', adminamendappCtrl);

adminamendappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function adminamendappCtrl($rootScope, $scope, $state, HTTPService) {


    function loadAmendAppList() {
        HTTPService.getAmendApp().then(function (res) {
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

    loadAmendAppList();

    $scope.showApplication = function (aid) {
        $state.go('app.singleapplication', { id: aid });
    }

}