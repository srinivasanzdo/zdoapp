angular
    .module('app')
    .controller('forgotpasswordCtrl', forgotpasswordCtrl);

forgotpasswordCtrl.$inject = ['$scope', '$state', 'HTTPService', '$location'];
function forgotpasswordCtrl($scope, $state, HTTPService, $location) {

    $scope.forgotPass = function (username) {

        if ($("#username").hasClass('form-validate-warning')) {
            alert("Please enter valid email id..");
        } else {
            $scope.params = {
                email: username
            }
            HTTPService.forgotpassword($scope.params).then(function (res) {
                if (res.data.status == 1) {
                    alert(res.data.message);
                    $state.go("appSimple.login");
                } else if (res.data.status == 0) {
                    alert(res.data.message);
                }else{

                }
            }, function (err) {
                alert("forgot password error...");
            });
        }

    }

}