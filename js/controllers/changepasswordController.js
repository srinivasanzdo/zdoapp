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
                old_password: changepass.oldpassword,
                new_password: changepass.password
            };

            HTTPService.changePassword($scope.params, localStorage.getItem('user_id')).then(function (res) {
                if (res.data.status == 1) {
                    alert(res.data.message);
                    HTTPService.logout();
                    $state.go("appSimple.login");
                }else{
                    alert(res.data.message);
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