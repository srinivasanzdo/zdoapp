angular
    .module('app')
    .controller('changepasswordCtrl', changepasswordCtrl);

changepasswordCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService', '$window'];
function changepasswordCtrl($rootScope, $scope, $state, HTTPService, $window) {

    $scope.submit = function (changepass) {
        //console.log("agent---", changepass);
        if (changepass.password != changepass.cpassword) {
            alert("Password , Confirm password are mismatch");
        } else {
            $scope.params = {
                oldpassword: agent.name,
                password: agent.email,
                id: localStorage.getItem('user_id')
            };

            HTTPService.changePassword($scope.params).then(function (res) {
                if (res.data.status == 1) {
                    alert(res.data.message);
                    HTTPService.logout();
                    $state.go("appSimple.login");
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

}