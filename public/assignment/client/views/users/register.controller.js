(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;

        function init(){

        }
        init();

        function register(user) {

            console.log("user for register");
            console.log(user);

                var newUser = {
                    username: vm.user.username,
                    password: vm.user.password,
                    email: vm.user.email

                };

                UserService
                    .createUser(newUser)
                    .then(function (response) {
                        UserService.setCurrentUser(response.data);
                        //$rootScope.currentUser = response.data;
                        $location.url("/profile");

                    });

            }

    }

})();