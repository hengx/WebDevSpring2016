(function(){
    'use strict';
    angular
        .module("MoocApp")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location) {
        var vm = this;

        vm.message = null;
        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            console.log("register controller");
            console.log(user);
            if (user == null || user.username == null || user.password == null || user.password2 == null) {
                vm.message = "Please provide a valid username or password";
            }
            if (user.password != user.password2) {
                vm.message = "Passwords do not match";
            }
            if (user.email == null) {
                vm.message = "Please provide a valid email";
            }

            UserService
                .register(user)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    console.log("register controller 1 is");
                    console.log(response.data);
                        UserService.setCurrentUser(response.data);
                    console.log("after set current user");
                        $location.url("/profile");
                    console.log("after register");
                }


            }

            function failure(response) {
                console.log("Registration Failed");
            }
        }

    }
})();