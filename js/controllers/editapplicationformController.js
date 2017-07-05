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

          

            HTTPService.updateApplicationWithoutToken($scope.applicationParams, $stateParams.aid).then(function (res) {
                    if (res.data.status == 1) {

                        $scope.abc = res.data.message;
                        $scope.liParam = {
                            link : $stateParams.key
                        }
                        HTTPService.updateLinkWithoutToken($scope.liParam).then(function (res) {
                            alert($scope.abc);
                            $scope.agentForm = true;
                            $scope.applicationForm = false;
                        }, function (err) {
                            alert($scope.abc);
                            $scope.agentForm = true;
                            $scope.applicationForm = false;
                        });

                    }
                }, function (err) {
                    console.log(err);
                    alert("Error in application submission. Conatact your agent....");
                    $scope.agentForm = true;
                    $scope.applicationForm = true;
                });


        }

    }

}