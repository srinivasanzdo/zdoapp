angular
    .module('app')
    .controller('agentlistCtrl', agentlistCtrl);

agentlistCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function agentlistCtrl($rootScope, $scope, $state, HTTPService) {

    $scope.options = {
        responsive: true
    }

    function loadAgentList() {
        HTTPService.getAgentList().then(function (res) {
            $scope.agentList = res.data;
        }, function (err) {
            console.log(err);
            if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
                HTTPService.logout();
                alert("Session Expired...");
            }
        });
    }

    loadAgentList();


    $scope.editAgent = function (agentid) {
        $state.go('app.agent.editagent', {
            id: agentid
        });
    };

    $scope.addAgent = function () {
        $state.go('app.agent.addagent');
    };

}