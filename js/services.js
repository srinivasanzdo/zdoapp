angular
    .module('app').service('HTTPService', function ($http) {

        this.login = function (params) {
            return $http({
                method: "post",
                url: domainURL + "authenticate",
                data: params
            });
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

    });

angular
    .module('app').factory('AuthFactory', ['$q', '$rootScope', '$http', '$state',
        function ($q, $rootScope, $http, $state) {
            var currentUser = '';
            var factory = {
                isLoggedIn: isLoggedIn,
                getCurrentUser: getUserInfo
            };

            var defer = $q.defer();
            function isLoggedIn() {
                var user_id = localStorage.getItem('user_id');
                if (user_id) {
                    var url = domainURL + 'user/' + user_id;
                    return $http.get(url).success(function (res) {
                        currentUser = res;
                    }).error(function (err) {
                        $state.go('login');
                    });
                } else {
                    defer.resolve(false);
                    $state.go('login');
                    return defer.promise;
                }
            };

            function getUserInfo() {
                return currentUser;
            };
            return factory;
        }]);