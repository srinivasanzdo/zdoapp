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

            localStorage.removeItem('user_token')
            localStorage.removeItem('user_id')
            localStorage.removeItem('user_role')

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