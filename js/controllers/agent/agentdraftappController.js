angular
    .module('app')
    .controller('agentdraftappCtrl', agentdraftappCtrl);

agentdraftappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function agentdraftappCtrl($rootScope, $scope, $state, HTTPService) {


    function loadAgentDraftAppList() {
        HTTPService.getAgentDraftApp(localStorage.getItem('user_id')).then(function (res) {
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

    loadAgentDraftAppList();

    $scope.showApplication = function(aid){
        $state.go('app.singleapplication',{id: aid});
    }

    $scope.showApplicationEdit = function (aid) {
        $state.go('app.agentapplication.editapplication', { id: aid, type:'draft' });
    }

}