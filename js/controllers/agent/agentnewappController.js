angular
    .module('app')
    .controller('agentnewappCtrl', agentnewappCtrl);

agentnewappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService', 'S3UploadService'];
function agentnewappCtrl($rootScope, $scope, $state, HTTPService, S3UploadService) {

    $scope.items = [];

    $scope.add = function () {
        if ($scope.items.length < 5) {
            var len = $scope.items.length + 1;
            $scope.items.push({
                length: len
            });
        }

    };

    $scope.uploadImage = function (files) {
        $scope.Files = files;
        if (files && files.length > 0) {
            angular.forEach($scope.Files, function (file, key) {
                S3UploadService.Upload(file).then(function (result) {
                    // Mark as success
                    //file.Success = true;
                    console.log("file result---", result);
                }, function (error) {
                    // Mark the error
                    $scope.Error = error;
                }, function (progress) {
                    // Write the progress as a percentage
                    //file.Progress = (progress.loaded / progress.total) * 100
                });
            });
        }

    }

    $scope.getImagebyName = function () {
      var image = "ZLLWBFgz-20160124_164959.jpg"
      S3UploadService.getImageBase64URL(image).then(function(res){
        if(res) {
          $scope.show = true;
          $scope.s3url = "data:image/jpeg;base64," + res;
        }
      })
    }

}