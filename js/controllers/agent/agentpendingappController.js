angular
    .module('app')
    .controller('agentpendingappCtrl', agentpendingappCtrl);

agentpendingappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function agentpendingappCtrl($rootScope, $scope, $state, HTTPService) {

    $scope.options = {
        responsive: true
    }

    function loadAgentPendingAppList() {
        HTTPService.getAgentPendingApp(localStorage.getItem('user_id')).then(function (res) {
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

    loadAgentPendingAppList();

    $scope.showApplication = function(aid){
        $state.go('app.singleapplication',{id: aid});
    }

}