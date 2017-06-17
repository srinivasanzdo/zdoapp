angular
    .module('app')
    .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$state', 'HTTPService'];
function loginCtrl($scope, $state, HTTPService) {
    $scope.loginFunction = function (params) {
        var param = {
            email: params.username,
            password: params.password
        };

        HTTPService.login(param).then(function (res) {
            HTTPService.currentuser(res.data.token).then(function (res) {
                if (res.data.user.role_id == 1)
                    $state.go("app.admindashboard");
                else
                    $state.go("app.agentdashboard");
            }, function (err) {
                console.log("current user error----", err);
            });

        }, function (err) {
            console.log("login error----", err);
        });
    }



}