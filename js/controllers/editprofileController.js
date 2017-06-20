angular
    .module('app')
    .controller('editprofileCtrl', editprofileCtrl);

editprofileCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function editprofileCtrl($rootScope, $scope, $state, HTTPService) {

    $scope.agent = {};
    HTTPService.getUser().then(function (res) {
        $scope.agent = res.data;
    }, function (err) {
        console.log(err);
        if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
            HTTPService.logout();
            alert("Session Expired...");
        }
    });

    $scope.submit = function (agent) {
        
        $scope.params = {
            name: agent.name,
            gender: agent.gender,
            phone: agent.phone
        };

        HTTPService.updateAgent($scope.params).then(function (res) {
            if (res.data.status == 1) {
                alert(res.data.message);
                $state.go("app.profile");
            }
        }, function (err) {
            console.log(err);
            if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
                HTTPService.logout();
                alert("Session Expired...");
            }
        });
    }
}