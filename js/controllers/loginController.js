angular
    .module('app')
    .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$state', 'HTTPService', '$location'];
function loginCtrl($scope, $state, HTTPService, $location) {
    $scope.login = {
        username: '',
        password: ''
    }
    $scope.loginFunction = function (params) {
        var param = {
            email: params.username,
            password: params.password
        };

        HTTPService.login(param).then(function (res) {
            localStorage.setItem('user_token', res.data.token);
            HTTPService.currentuser(res.data.token).then(function (res) {
                localStorage.setItem('user_id', res.data.user.id);
                localStorage.setItem('user_role', res.data.user.role_id);
                localStorage.setItem('user_show_name', res.data.user.name);
                if (res.data.user.role_id == 1)
                    $state.go("app.admindashboard");
                else
                    $state.go("app.agentdashboard");
            }, function (err) {
                console.log("current user error----", err);
            });

        }, function (err) {
            console.log("login error----", err);
            $scope.login = {
                username: '',
                password: ''
            }
            alert("Invalid credentials");
        });
    }

    $scope.doSomething = function (login) {
        //console.log(login);

        if (login) {
            if (!login.username) {
                alert("Please enter Username...");
            } else if (!login.password) {
                alert("Please enter Password...");
            } else {
                $scope.loginFunction(login);
            }

        } else {
            alert("Please enter login credentials...");
        }
    }



}