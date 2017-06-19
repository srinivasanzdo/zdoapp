angular
    .module('app')
    .controller('agentrejectappCtrl', agentrejectappCtrl);

agentrejectappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function agentrejectappCtrl($rootScope, $scope, $state, HTTPService) {


    function loadAgentRejectAppList() {
        HTTPService.getAgentRejectedApp(localStorage.getItem('user_id')).then(function (res) {
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

    loadAgentRejectAppList();

}