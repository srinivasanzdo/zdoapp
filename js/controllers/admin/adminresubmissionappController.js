angular
    .module('app')
    .controller('adminresubmissionappCtrl', adminresubmissionappCtrl);

adminresubmissionappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function adminresubmissionappCtrl($rootScope, $scope, $state, HTTPService) {


    function loadRejectAppList() {
        HTTPService.getRejectedApp().then(function (res) {
            //$scope.appList = res.data;
        }, function (err) {
            console.log(err);
            if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
                HTTPService.logout();
                alert("Session Expired...");
            }
        });
    }

    $scope.appList = {};

    loadRejectAppList();

}