angular
    .module('app').service('HTTPService', function ($http) {

        this.login = function () {
            //return "success";

            return $http({
                method: "get",
                url: domainURL + "physio"
            });
        }

    });