angular
    .module('app')
    .controller('agentnewappCtrl', agentnewappCtrl);

agentnewappCtrl.$inject = ['$rootScope', '$scope', '$state', 'HTTPService', 'S3UploadService'];
function agentnewappCtrl($rootScope, $scope, $state, HTTPService, S3UploadService) {


    $scope.items = [];

    $scope.showEmailForm = false;

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

    $scope.applicationEmail = function () {

        $scope.showEmailForm = true;

    }

    $scope.applicationWhatsapp = function () {

        var baseurl = window.location.protocol + "//" + window.location.host + "/#!/";
        var uniquewhatsapp = makeid();
        var linkurl = encodeURIComponent(baseurl) + "applicationform/" + localStorage.getItem('user_id') + "/" + uniquewhatsapp;

        $scope.linkParamWhatsapp = {
            link: uniquewhatsapp,
            user_id: localStorage.getItem('user_id'),
            status: 'open'
        }

        HTTPService.sendWhatsappLink($scope.linkParamWhatsapp).then(function (res) {
            if (res.data.status == 1) {
                // alert(res.data.message);
                // $state.go("app.agentdashboard");
                window.location = "whatsapp://send?text=" + linkurl;
            }
        }, function (err) {
            console.log(err);
            if (err.data.error == "token_not_provided" || err.data.error == "token_expired" || err.data.error == "token_invalid") {
                HTTPService.logout();
                alert("Session Expired...");
            }
        });

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

    $scope.getImagebyName = function () {
        var image = "ZLLWBFgz-20160124_164959.jpg"
        S3UploadService.getImageBase64URL(image).then(function (res) {
            if (res) {
                $scope.show = true;
                $scope.s3url = "data:image/jpeg;base64," + res;
                //console.log($scope.s3url);
            }
        })
    }

    $scope.emailSubmit = function (customerEmail) {
        if ($("#customeremail").hasClass('form-validate-warning')) {
            alert("Please enter valid email id..");
        } else {

            var baseurl = window.location.protocol + "//" + window.location.host + "/#!/";
            var uniqueid = makeid();
            var linkurl = baseurl + "applicationform/" + localStorage.getItem('user_id') + "/" + uniqueid;

            $scope.linkParam = {
                link: uniqueid,
                user_id: localStorage.getItem('user_id'),
                status: 'open',
                email: customerEmail,
                full_link: linkurl
            }

            HTTPService.sendEmailLink($scope.linkParam).then(function (res) {
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

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 25; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
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

                console.log($scope.document);

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
                    user_id: parseInt(localStorage.getItem('user_id')),
                    remark: application.remark ? application.remark : null,
                    rejected: "No",
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