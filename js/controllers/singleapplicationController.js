angular
    .module('app')
    .controller('singleapplicationCtrl', singleapplicationCtrl);

singleapplicationCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService', '$stateParams', 'S3UploadService'];
function singleapplicationCtrl($rootScope, $scope, $state, HTTPService, $stateParams, S3UploadService) {

    $scope.application = {};
    HTTPService.getSingleApplication($stateParams.id).then(function (res) {
        $scope.application = res.data;
    }, function (err) {
        console.log(err);
        if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
            HTTPService.logout();
            alert("Session Expired...");
        }
    });

    $scope.getImagebyName = function (imagepath) {
        S3UploadService.getImageBase64URL(imagepath).then(function (res) {
            if (res) {
                $scope.s3url = "data:image/jpeg;base64," + res;
                //console.log($scope.s3url);
                window.open($scope.s3url, '_blank');
            }
        });
    }

}