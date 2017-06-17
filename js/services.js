angular
    .module('app').service('HTTPService', function ($http) {

        this.login = function (params) {
            return $http({
                method: "post",
                url: domainURL + "authenticate",
                data: params
            });
        }

        this.currentuser = function(params){
            return $http({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+params
                },
                url: domainURL + "currentUser",
                
            });
        }

    });