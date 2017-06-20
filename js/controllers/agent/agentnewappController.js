angular
    .module('app')
    .controller('agentnewappCtrl', agentnewappCtrl);

agentnewappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService', 'S3UploadService'];
function agentnewappCtrl($rootScope, $scope, $state, HTTPService, S3UploadService) {


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

    console.log($scope.today)

    $scope.addNode = function () {
        if ($scope.items.length < 5) {
            var len = $scope.items.length + 1;
            $scope.items.push({
                length: len,
                name: 'document' + len
            });
        }

    };

    $scope.applicationEmail = function () {

    }

    $scope.applicationWhatsapp = function () {

    }

    $scope.isMobile = detectmob();

    function detectmob() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.document = []

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

    $scope.getImagebyName = function () {
        var image = "ZLLWBFgz-20160124_164959.jpg"
        S3UploadService.getImageBase64URL(image).then(function (res) {
            if (res) {
                $scope.show = true;
                $scope.s3url = "data:image/jpeg;base64," + res;
                console.log($scope.s3url);
            }
        })
    }


    $scope.submit = function (application,statusid) {

        if ($scope.document.length != 3) {
            alert("Upload all doucments...");
        } else {
            var validate = false;
            if (application.preexisting_condition == "Yes" || application.high_blood_pressure == "Yes" || application.diabetes == "Yes" || application.high_cholesterol == "Yes") {
                if (application.diagnosisdate) {
                    validate = true;
                }
            }

            if (!validate) {
                alert("Enter Diagnosis date..");
            } else {

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
                    diagnosisdate: application.diagnosisdate,
                    pending_claims: application.pending_claims,
                    other_entitlement_policies: application.other_entitlement_policies,
                    cause_complaint: application.cause_complaint,
                    signs_symptoms: application.signs_symptoms,
                    preffereddate: application.preffereddate,
                    status_id: statusid,
                    user_id: parseInt(localStorage.getItem('user_id')),
                    remark: application.remark ? application.remark : null,
                    rejected: application.rejected ? application.rejected : null,
                    amend_remark: application.amend_remark ? application.amend_remark : null,
                    reject_remark: application.reject_remark ? application.reject_remark : null,
                    photo: $scope.document

                }

                //console.log($scope.applicationParams);

                HTTPService.addApplication($scope.applicationParams).then(function (res) {
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

}