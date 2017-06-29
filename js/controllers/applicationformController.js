angular
    .module('app')
    .controller('applicationformCtrl', applicationformCtrl);

applicationformCtrl.$inject = ['$scope', '$state', 'HTTPService', '$location', '$stateParams'];
function applicationformCtrl($scope, $state, HTTPService, $location, $stateParams) {
    console.log($stateParams.id);
    console.log($stateParams.key);

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

    $scope.items = [];

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

    //console.log($scope.today)

    $scope.addNode = function (event) {
        event.stopPropagation();
        if ($scope.items.length < 5) {
            var len = $scope.items.length + 1;
            $scope.items.push({
                length: len,
                name: 'document' + len
            });
        }

    };

    $scope.uploadImage = function (files, event) {
        $scope.Files = files;

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

    }


    $scope.submit = function (application, statusid) {

        if ($("#nric_front").attr("data-dpath") == "" || $("#nric_back").attr("data-dpath") == "" || $("#document").attr("data-dpath") == "") {
            alert("Upload all required doucments...");
        } else {
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

                $scope.document = [];
                $(".applicationDoc").each(function () {
                    var docnode = {
                        type: '',
                        path: ''
                    }
                    if ($(this).attr("data-dpath") != "" && $(this).attr("data-dpath")) {
                        docnode.type = $(this).attr("data-dtype");
                        docnode.path = $(this).attr("data-dpath");

                        $scope.document.push(docnode);
                    }
                });

                //console.log($scope.document);

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
                    status_id: statusid,
                    user_id: $stateParams.id,
                    remark: application.remark ? application.remark : null,
                    rejected: "No",
                    amend_remark: application.amend_remark ? application.amend_remark : null,
                    reject_remark: application.reject_remark ? application.reject_remark : null,
                    photo: $scope.document

                }

                //console.log($scope.applicationParams);

                HTTPService.addApplicationWithoutToken($scope.applicationParams).then(function (res) {
                    if (res.data.status == 1) {

                        $scope.abc = res.data.message;
                        $scope.liParam = {
                            linnk : $stateParams.key
                        }
                        HTTPService.addApplicationWithoutToken($scope.liParam).then(function (res) {
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
}