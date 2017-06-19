angular
    .module('app')
    .controller('applicationCtrl', applicationCtrl);

applicationCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function applicationCtrl($rootScope, $scope, $state, HTTPService) {
    $rootScope.isAgent = localStorage.getItem('user_role') == 2 ? true : false;

    $scope.logoutFunciton = function () {
        HTTPService.logout();
    }
}