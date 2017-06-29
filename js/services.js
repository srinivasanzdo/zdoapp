angular
    .module('app').service('HTTPService', function ($http, $state) {

        this.login = function (params) {
            return $http({
                method: "post",
                url: domainURL + "authenticate",
                data: params
            });
        }

        this.logout = function () {

            localStorage.setItem('user_token', "");
            localStorage.setItem('user_id', "");
            localStorage.setItem('user_role', "");
            localStorage.setItem('user_show_name', "");

            localStorage.removeItem('user_token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_role');
            localStorage.removeItem('user_show_name');
            

            $state.go("appSimple.login");
        }

        this.currentuser = function (params) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + params
                },
                url: domainURL + "currentUser",

            });
        }

        this.getUser = function () {
            var user_id = localStorage.getItem('user_id');
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "user/" + user_id,

            });
        }

        this.getUserWithoutToken = function (id) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                },
                url: domainURL + "userwithouttoken/" + id,

            });
        }

        this.getLinkWithoutToken = function (li) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                },
                url: domainURL + "linkDetail/" + li,

            });
        }

        this.updateLinkWithoutToken = function (params) {
            return $http({
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                url: domainURL + "linkUpdate",
                data: params

            });
        }

        this.sendEmailLink = function (params) {
            return $http({
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "sendEmailLink",
                data: params

            });
        }

        this.sendWhatsappLink = function (params) {
            return $http({
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "sendWhatsappLink",
                data: params

            });
        }

        this.getAgentList = function () {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getAgentList",

            });
        }

        this.addAgent = function (params) {
            return $http({
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "createAgent",
                data: params

            });
        }

        this.updateAgent = function (params) {
            return $http({
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "user/" + localStorage.getItem('user_id'),
                data: params

            });
        }

        this.getAgentAllApp = function (id) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getUserAllApplication/" + id,

            });
        }

        this.getAgentPendingApp = function (id) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getUserPendingApplication/" + id,

            });
        }

        this.getAgentAmendApp = function (id) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getUserAmendApplication/" + id,

            });
        }

        this.getAgentDraftApp = function (id) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getUserDraftApplication/" + id,

            });
        }

        this.getAgentApprovedApp = function (id) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getUserApprovedApplication/" + id,

            });
        }

        this.getAgentRejectedApp = function (id) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getUserRejectedApplication/" + id,

            });
        }

        this.getAgentReceivedApp = function (id) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getUserReceivedApplication/" + id,

            });
        }

        this.getAllApp = function () {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getAllApplication",

            });
        }

        this.getPendingApp = function () {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getPendingApplication",

            });
        }

        this.getAmendApp = function () {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getAmendApplication",

            });
        }

        this.getApprovedApp = function () {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getApprovedApplication",

            });
        }

        this.getRejectedApp = function () {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getRejectedApplication",

            });
        }

        this.getResubmitApp = function () {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getResubmitApplication",

            });
        }

        this.getAllAppCount = function () {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getApplicationCount",

            });
        }

        this.getUserAllAppCount = function (id) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getUserApplicationCount/" + id,

            });
        }

        this.addApplication = function (params) {
            return $http({
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "application",
                data: params

            });
        }
        this.addApplicationWithoutToken = function (params) {
            return $http({
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                url: domainURL + "applicationSubmit",
                data: params

            });
        }

        this.updateApplication = function (params, id) {
            return $http({
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "updateApplication/" + id,
                data: params

            });
        }

        this.getSingleApplication = function (id) {
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('user_token')
                },
                url: domainURL + "getApplication/" + id,

            });
        }

    });

angular
    .module('app').factory('AuthFactory', ['$q', '$rootScope', '$http', '$state',
        function ($q, $rootScope, $http, $state) {
            var factory = {
                isLoggedIn: isLoggedIn
            };

            var defer = $q.defer();
            function isLoggedIn() {
                var user_id = localStorage.getItem('user_id');
                if (user_id) {
                    var url = domainURL + 'user/' + user_id;
                    return $http({
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem('user_token')
                        },
                        url: url
                    });
                } else {
                    defer.resolve(false);
                    $state.go('appSimple.login');
                    return defer.promise;
                }
            };

            return factory;
        }]);