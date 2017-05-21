// controller.js

angular
    .module('app')
    .controller('loginCtrl', loginCtrl);


loginCtrl.$inject = ['$scope', '$state', 'HTTPService'];
function loginCtrl($scope, $state, HTTPService) {
    $scope.login = function () {
        
        //alert(HTTPService.login());
        $state.go('app.adminmain');

        // HTTPService.login().then(function (res) {
        //     console.log(res);
        // }, function (err) {
        //     console.log(err);
        // });
    }
}