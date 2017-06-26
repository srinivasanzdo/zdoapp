angular
    .module('app')
    .controller('agentdashboardCtrl', agentdashboardCtrl);

agentdashboardCtrl.$inject = ['$rootScope', '$scope', '$state', 'AuthFactory', 'HTTPService'];
function agentdashboardCtrl($rootScope, $scope, $state, AuthFactory, HTTPService) {

    $scope.all = 0;
    $scope.pending = 0;
    $scope.amend = 0;
    $scope.reject = 0;
    $scope.approve = 0;
    $scope.receive = 0;
    $scope.draft = 0;

    HTTPService.getUserAllAppCount(localStorage.getItem('user_id')).then(function (res) {
        //console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
            $scope.all = $scope.all + parseInt(res.data[i].total);
            if (res.data[i].status_id == 1) {
                $scope.pending = res.data[i].total;
            } else if (res.data[i].status_id == 2) {
                $scope.amend = res.data[i].total;
            }else if (res.data[i].status_id == 3) {
                $scope.draft = res.data[i].total;
            } else if (res.data[i].status_id == 4) {
                $scope.approve = res.data[i].total;
            } else if (res.data[i].status_id == 5) {
                $scope.reject = res.data[i].total;
            }else if (res.data[i].status_id == 7) {
                $scope.receive = res.data[i].total;
            } else {

            }
        }
    }, function (err) {
        console.log(err);
        if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
            HTTPService.logout();
            alert("Session Expired...");
        }
    });

    $scope.gotoAllApplication = function(){
        $state.go('app.agentapplication.allapp');
    }

    $scope.gotoPendingApplication = function(){
        $state.go('app.agentapplication.pendingapp');
    }

    $scope.gotoAmendApplication = function(){
        $state.go('app.agentapplication.amendapp');
    }

    $scope.gotoRejectApplication = function(){
        $state.go('app.agentapplication.rejectapp');
    }

    $scope.gotoApproveApplication = function(){
        $state.go('app.agentapplication.approveapp');
    }

    $scope.gotoReceiveApplication = function(){
        $state.go('app.agentapplication.receiveapp');
    }

    $scope.gotoDraftApplication = function(){
        $state.go('app.agentapplication.draftapp');
    }

}