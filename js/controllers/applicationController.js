angular
    .module('app')
    .controller('applicationCtrl', applicationCtrl);

applicationCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService'];
function applicationCtrl($rootScope, $scope, $state, HTTPService) {
    $rootScope.isAgent = localStorage.getItem('user_role') == 2 ? true : false;

    $scope.userShowName = localStorage.getItem('user_show_name');

    $scope.logoutFunciton = function () {
        var r = confirm("Do you want logout the application ?");
        if (r)
            HTTPService.logout();
    }

    // window.onbeforeunload = function () {
    //     myfun();
    //     return 'Are you sure you want to leave?';
    // };

    // function myfun(){
    //     alert("leave.....");
    // }
}