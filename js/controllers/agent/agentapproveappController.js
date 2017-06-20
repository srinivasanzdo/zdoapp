angular
    .module('app')
    .controller('agentapproveappCtrl', agentapproveappCtrl);

agentapproveappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function agentapproveappCtrl($rootScope, $scope, $state, HTTPService) {


    function loadAgentApproveAppList() {
        HTTPService.getAgentApprovedApp(localStorage.getItem('user_id')).then(function (res) {
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

    loadAgentApproveAppList();

    $scope.showApplication = function(aid){
        $state.go('app.singleapplication',{id: aid});
    }

}