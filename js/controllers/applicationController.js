angular
    .module('app')
    .controller('applicationCtrl', applicationCtrl);

applicationCtrl.$inject = ['$rootScope', '$scope', '$state'];
function applicationCtrl($rootScope, $scope, $state) {
    console.log(localStorage.getItem('user_role') == 1 ? true : false);
    $rootScope.isAgent = localStorage.getItem('user_role') == 2 ? true : false;
}