angular
    .module('app')
    .controller('editapplicationformCtrl', editapplicationformCtrl);

editapplicationformCtrl.$inject = ['$scope', '$state', 'HTTPService', '$location', '$stateParams', 'S3UploadService'];
function editapplicationformCtrl($scope, $state, HTTPService, $location, $stateParams, S3UploadService) {

    $scope.agentForm = false;
    $scope.applicationForm = false;



    HTTPService.getUserWithoutToken($stateParams.id).then(function (res) {
        $scope.agent = res.data;
    }, function (err) {
        console.log(err);
    });

    HTTPService.getLinkWithoutToken($stateParams.key).then(function (res) {
        if (res.data) {
            if (res.data.status == 'open') {
                $scope.agentForm = false;
                $scope.applicationForm = true;
            } else if (res.data.status == 'close') {
                alert("your application link is expired. contact your agent...");
                $scope.agentForm = true;
                $scope.applicationForm = false;
            } else {
                alert("your application link is expired. contact your agent...");
                $scope.agentForm = true;
                $scope.applicationForm = false;
            }

        } else {
            $scope.agentForm = true;
            $scope.applicationForm = false;
        }
    }, function (err) {
        console.log(err);
        $scope.agentForm = true;
        $scope.applicationForm = false;
    });

    $scope.olddoc = []

    $scope.application = {};
    HTTPService.getSingleApplicationWithoutToken($stateParams.aid).then(function (res) {
        $scope.application = res.data;
        for (var i = 0; i < res.data.image.length; i++) {
            $scope.olddoc[res.data.image[i].type] = res.data.image[i].path;
        }
        if (res.data.status.id != 7) {
            alert("your application status changed. contact your agent...");
            $scope.agentForm = true;
            $scope.applicationForm = false;
        }

    }, function (err) {
        console.log(err);
    });

}