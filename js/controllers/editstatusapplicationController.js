angular
    .module('app')
    .controller('editstatusapplicationCtrl', editstatusapplicationCtrl);

editstatusapplicationCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService', '$stateParams', 'S3UploadService'];
function editstatusapplicationCtrl($rootScope, $scope, $state, HTTPService, $stateParams, S3UploadService) {

    $scope.options = [
        {
            name: 'Please Select',
            value: 0
        },
        {
            name: 'Amend',
            value: 2
        },
        {
            name: 'Approved',
            value: 4
        },
        {
            name: 'Rejected',
            value: 5
        }

    ];

    $scope.selectedOption = $scope.options[0];



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

    $scope.submitStatus = function (selectedOption, remark) {
        var validate = false;

        if (selectedOption.value == 2 || selectedOption.value == 5) {
            if (remark) {
                validate = true
            }
        } else {
            validate = true;
        }

        if (!validate) {
            alert("Enter remark...")
        } else {
            $scope.updateParam = {
                status_id: selectedOption.value,
                amend_remark: selectedOption.value == 2 ? remark : null,
                reject_remark: selectedOption.value == 5 ? remark : null,
            }

            HTTPService.updateApplication($scope.updateParam, $scope.application.id).then(function (res) {
                if (res.data.status == 1) {
                    alert(res.data.message);
                    $state.go("app.admindashboard");
                }
            }, function (err) {
                console.log(err);
                if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
                    HTTPService.logout();
                    alert("Session Expired...");
                }
            });

        }

    }

}