(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.message = null;
        vm.register = register;

        function init() {

        }

        init();

        function register(user) {

            console.log("user for register");
            console.log(user);
            if (user == null || user.username == null || user.password == null || user.password2 == null) {
                vm.message = "Please provide a valid username or password"
            }
            if (user.password != user.password2) {
                vm.message = "Passwords do not match"
            }
            if (user.email == null) {
                vm.message = "Please provide a valid email"
            }

            //UserService
            //    .findUserByUsername(user.username)
            //    .then(function (response) {
            //        if (response.data) {
            //            vm.message = "User already exists, please login";
            //            $location.url("/login");
            //        }
            //        else {
                        UserService
                            .register(user)
                            .then(function (response) {
                                UserService.setCurrentUser(response.data);
                                //$rootScope.currentUser = response.data;
                                $location.url("/profile");

                            });
                //
                //
                //    }
                //})


        }
    }
})();