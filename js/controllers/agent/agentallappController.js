angular
    .module('app')
    .controller('agentallappCtrl', agentallappCtrl);

agentallappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function agentallappCtrl($rootScope, $scope, $state, HTTPService) {


    function loadAgentAllAppList() {
        HTTPService.getAgentAllApp(localStorage.getItem('user_id')).then(function (res) {
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

    loadAgentAllAppList();

    $scope.showApplication = function(aid){
        $state.go('app.singleapplication',{id: aid});
    }

}