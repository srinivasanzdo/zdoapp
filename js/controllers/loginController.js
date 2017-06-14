angular
    .module('app')
    .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope','$state'];
function loginCtrl($scope, $state) {
    $scope.loginFunction = function (params) {
        $state.go("app.admindashboard");
    }

}