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
            console.log("login client");
            console.log(user);
            if (!user){
                return;
            }
            if (user.username == null || user.password == null){
                vm.messsage = "Please fill in the required fields";
                return;
            }

            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if (response.data){
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    } else {
                        vm.messsage = "Login Failed";
                        console.log("User does not exist")
                    }

                });
        }
    }
})();