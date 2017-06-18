angular
    .module('app')
    .controller('admindashboardCtrl', admindashboardCtrl);

admindashboardCtrl.$inject = ['$rootScope', '$scope', '$state', 'AuthFactory'];
function admindashboardCtrl($rootScope, $scope, $state, AuthFactory) {
    console.log("isagent-----", $rootScope.isAgent);
}