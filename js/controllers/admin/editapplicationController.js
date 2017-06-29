angular
    .module('app')
    .controller('admineditapplicationCtrl', admineditapplicationCtrl);

admineditapplicationCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService', '$stateParams', 'S3UploadService'];
function admineditapplicationCtrl($rootScope, $scope, $state, HTTPService, $stateParams, S3UploadService) {

    $scope.isAmend = false;
    $scope.isReject = false;

    if ($stateParams.type == "amend") {
        $scope.isAmend = true;
    }
    if ($stateParams.type == "reject") {
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

    $scope.olddoc = []

    $scope.today = y + "-" + m + "-" + d;
    $scope.yesterday = y + "-" + m + "-" + yest;

    $scope.application = {};
    HTTPService.getSingleApplication($stateParams.id).then(function (res) {
        $scope.application = res.data;
        for (var i = 0; i < res.data.image.length; i++) {
            $scope.olddoc[res.data.image[i].type] = res.data.image[i].path;
        }

    }, function (err) {
        console.log(err);
        if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
            HTTPService.logout();
            alert("Session Expired...");
        }
    });

    $scope.uploadImage = function (files, event) {
        $scope.Files = files;

        // if ($("#" + event.target.id).attr("data-dpath") && $("#" + event.target.id).attr("data-dpath") != "") {

        // }

        if (files.length != 0) {
            var xy = files[0].type.split('/');

            if (files && files.length > 0) {
                if (xy[1] == "jpg" || xy[1] == "jpeg" || xy[1] == "JPG" || xy[1] == "JPEG" || xy[1] == "png" || xy[1] == "PNG") {


                    angular.forEach($scope.Files, function (file, key) {
                        S3UploadService.Upload(file).then(function (result) {
                            $("#" + event.target.id).attr("data-dpath", result.key);
                        }, function (error) {
                            $scope.Error = error;
                        }, function (progress) {
                            // Write the progress as a percentage
                            //file.Progress = (progress.loaded / progress.total) * 100
                        });
                    });
                } else {
                    $("#" + event.target.id).val('');
                    alert("upload only JPEG and PNG images...");
                }
            }

        } else {
            if (files.length == 0) {
                var xxx = $scope.olddoc[$("#" + event.target.id).attr("data-dtype")];
                $("#" + event.target.id).attr("data-dpath", xxx);
            }
        }



    }

    $scope.getImagebyName = function (imagepath) {
        if (imagepath) {
            S3UploadService.getImageBase64URL(imagepath).then(function (res) {
                if (res) {
                    $scope.s3url = "data:image/jpeg;base64," + res;
                    //console.log($scope.s3url);
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

            $scope.document = [];
            $(".applicationDoc").each(function () {
                var docnode = {
                    id: '',
                    type: '',
                    path: ''
                }
                if ($(this).attr("data-dpath") != "" && $(this).attr("data-dpath")) {
                    docnode.id = $(this).attr("data-did");
                    docnode.type = $(this).attr("data-dtype");
                    docnode.path = $(this).attr("data-dpath");

                    $scope.document.push(docnode);
                }
            });

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
                rejected: rejected,
                photo: $scope.document
            }

            console.log($scope.applicationParams);

            HTTPService.updateApplication($scope.applicationParams, $scope.application.id).then(function (res) {
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