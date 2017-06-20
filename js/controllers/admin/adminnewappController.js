angular
    .module('app')
    .controller('adminnewappCtrl', adminnewappCtrl);

adminnewappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function adminnewappCtrl($rootScope, $scope, $state, HTTPService) {


    function loadNewAppList() {
        HTTPService.getPendingApp().then(function (res) {
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

    loadNewAppList();

}