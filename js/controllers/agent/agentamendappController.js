angular
    .module('app')
    .controller('agentamendappCtrl', agentamendappCtrl);

agentamendappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function agentamendappCtrl($rootScope, $scope, $state, HTTPService) {


    function loadAgentAmendAppList() {
        HTTPService.getAgentAmendApp(localStorage.getItem('user_id')).then(function (res) {
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

    loadAgentAmendAppList();

    $scope.showApplication = function(aid){
        $state.go('app.singleapplication',{id: aid});
    }

    $scope.showApplicationEdit = function (aid) {
        $state.go('app.agentapplication.editapplication', { id: aid, type:'amend' });
    }

}