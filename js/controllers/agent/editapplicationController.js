angular
    .module('app')
    .controller('editapplicationCtrl', editapplicationCtrl);

editapplicationCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService', '$stateParams', 'S3UploadService'];
function editapplicationCtrl($rootScope, $scope, $state, HTTPService, $stateParams, S3UploadService) {


    $scope.items = [];

    $scope.isAmend = false;
    $scope.isReject = false;

    if($stateParams.type=="amend"){
        $scope.isAmend = true;
    }
    if($stateParams.type=="reject"){
        $scope.isReject = true;
    }




    var x = new Date();
    var d = x.getDate();
    var m = x.getMonth() + 1;
    var y = x.getFullYear();
    if (m < 10) {
        m = "0" + m;
    }

    var yest = d - 1;

    $scope.today = y + "-" + m + "-" + d;
    $scope.yesterday = y + "-" + m + "-" + yest;

    $scope.addNode = function () {
        if ($scope.items.length < 5) {
            var len = $scope.items.length + 1;
            $scope.items.push({
                length: len,
                name: 'document' + len
            });
        }

    };


    $scope.document = [];

    $scope.application = {};
    HTTPService.getSingleApplication($stateParams.id).then(function (res) {
        $scope.application = res.data;

        for (var i = 0; i < res.data.image.length; i++) {
            if (res.data.image[i].type == "nric_front") {
                $scope.nric_front = res.data.image[i].path;
            }
            if (res.data.image[i].type == "nric_back") {
                $scope.nric_back = res.data.image[i].path;
            }
            if (res.data.image[i].type == "document") {
                $scope.documents = res.data.image[i].path;
            }

        }

    }, function (err) {
        console.log(err);
        if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
            HTTPService.logout();
            alert("Session Expired...");
        }
    });

    $scope.uploadImage = function (files, doctype) {
        $scope.Files = files;

        var xy = files[0].type.split('/');

        if (xy[1] == "jpg" || xy[1] == "jpeg" || xy[1] == "JPG" || xy[1] == "JPEG" || xy[1] == "png" || xy[1] == "PNG") {
            if (files && files.length > 0) {
                $scope.docnode = {
                    type: '',
                    path: ''
                }
                angular.forEach($scope.Files, function (file, key) {
                    S3UploadService.Upload(file).then(function (result) {
                        // Mark as success
                        //file.Success = true;

                        $scope.docnode.type = doctype;
                        $scope.docnode.path = result.key;
                        $scope.document.push($scope.docnode);

                    }, function (error) {
                        // Mark the error
                        $scope.Error = error;
                    }, function (progress) {
                        // Write the progress as a percentage
                        //file.Progress = (progress.loaded / progress.total) * 100
                    });
                });
            }
        } else {
            alert("upload only JPEG and PNG images...");
        }

    }

    $scope.getImagebyName = function (imagepath) {
        if (imagepath) {
            S3UploadService.getImageBase64URL(imagepath).then(function (res) {
                if (res) {
                    $scope.s3url = "data:image/jpeg;base64," + res;
                    console.log($scope.s3url);
                    window.open($scope.s3url, '_blank');
                }
            });
        }
    }


    $scope.submit = function (application) {


        var validate = false;
        var validate_val = false;

        if (application.preexisting_condition == "Yes" || application.high_blood_pressure == "Yes" || application.diabetes == "Yes" || application.high_cholesterol == "Yes") {
            if (application.diagnosisdate) {
                validate = true;
                validate_val = true;
            }
        }

        if (application.preexisting_condition == "No" && application.high_blood_pressure == "No" && application.diabetes == "No" && application.high_cholesterol == "No") {
            validate = true;
            validate_val = false;
        }

        if (!validate) {
            alert("Enter Diagnosis date..");
        } else {

            var rejected = "No";

            if ($stateParams.type == "reject") {
                rejected = "Yes";
            }


            $scope.applicationParams = {
                name: application.name,
                gender: application.gender,
                nric: application.nric,
                dob: application.dob,
                occupation: application.occupation,
                contact: application.contact,
                nok_relationship: application.nok_relationship,
                contact_nok: application.contact_nok,
                shieldplan_paplan_date: application.shieldplan_paplan_date,
                exclusionplan: application.exclusionplan,
                preexisting_condition: application.preexisting_condition,
                high_blood_pressure: application.high_blood_pressure,
                diabetes: application.diabetes,
                high_cholesterol: application.high_cholesterol,
                diagnosisdate: validate_val ? application.diagnosisdate : null,
                pending_claims: application.pending_claims,
                other_entitlement_policies: application.other_entitlement_policies,
                cause_complaint: application.cause_complaint,
                signs_symptoms: application.signs_symptoms,
                preffereddate: application.preffereddate,
                status_id: 1,
                remark: application.remark ? application.remark : null,
                rejected: rejected
            }

            //console.log($scope.applicationParams);

            HTTPService.updateApplication($scope.applicationParams, $scope.application.id).then(function (res) {
                if (res.data.status == 1) {
                    alert(res.data.message);
                    $state.go("app.agentdashboard");
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