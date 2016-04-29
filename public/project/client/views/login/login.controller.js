(function(){
    'use strict';
    angular
        .module("MoocApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $location){
        var vm = this;

        vm.messsage = null;
        vm.login = login;

        function init(){
        }
        init();

        function login(user){
            //console.log("login client");
            //console.log(user);
            if (!user || user.username == null || user.password == null){
                vm.messsage = "Please fill in the required fields";
            }

            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(success,failure);

            function success(response) {

                if (response.data) {
                    UserService.setCurrentUser(response.data);
                    vm.messsage="Login Succeeded";
                    $location.url("/profile");
                }
            }

            function failure(response){
                vm.messsage = "Login Failed";
                console.log("User does not exist");
            }

        }
    }
})();