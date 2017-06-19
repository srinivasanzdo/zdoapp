angular
    .module('app')
    .controller('editagentCtrl', editagentCtrl);

editagentCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService', '$stateParams'];
function editagentCtrl($rootScope, $scope, $state, HTTPService, $stateParams) {
    alert($stateParams.id);
}