angular
    .module('app')
    .controller('addagentCtrl', addagentCtrl);

addagentCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService', '$window'];
function addagentCtrl($rootScope, $scope, $state, HTTPService, $window) {

    $scope.submit = function (agent) {
        //console.log("agent---", agent);
        if (agent.password != agent.cpassword) {
            alert("Password , Confirm password are mismatch");
        } else {
            $scope.params = {
                name: agent.name,
                email: agent.email,
                password: agent.password,
                gender: agent.gender,
                phone: agent.phone,
                role_id: 2
            };

            HTTPService.addAgent($scope.params).then(function (res) {
                if (res.data.status == 1) {
                    alert(res.data.message);
                    $state.go("app.agent.viewagentlist");
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

    $scope.resetForm = function () {
        $window.location.reload();
    }

}