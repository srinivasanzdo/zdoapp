angular
    .module('app')
    .controller('profileCtrl', profileCtrl);

profileCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function profileCtrl($rootScope, $scope, $state, HTTPService) {
    $scope.profile = {};
    HTTPService.getUser().then(function (res) {
        $scope.profile = res.data;
    }, function (err) {
        console.log(err);
        if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
            HTTPService.logout();
            alert("Session Expired...");
        }
    });

    $scope.editProfile = function (){
        $state.go('app.editprofile');
    }
}