angular
    .module('app')
    .controller('agentreceiveappCtrl', agentreceiveappCtrl);

agentreceiveappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function agentreceiveappCtrl($rootScope, $scope, $state, HTTPService) {


    function loadAgentReceiveAppList() {
        HTTPService.getAgentReceivedApp(localStorage.getItem('user_id')).then(function (res) {
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

    loadAgentReceiveAppList();

    $scope.showApplication = function(aid){
        $state.go('app.singleapplication',{id: aid});
    }

}