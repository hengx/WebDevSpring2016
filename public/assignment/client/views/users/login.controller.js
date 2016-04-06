(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $rootScope) {
        var vm = this;
        vm.login = login;

        function init(){

        }
        init();

        function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(function (response) {
                    if (response.data) {
                        console.log("response");
                        console.log(response);
                        //UserService.setCurrentUser(response.data);
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    }
                    else {
                        console.log("User does not exist")
                    }

                });
        }

    }
})();