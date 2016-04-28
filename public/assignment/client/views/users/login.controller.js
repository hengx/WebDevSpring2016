(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.messsage = null;
        vm.login = login;

        function init(){

        }
        init();

        function login(username, password) {
            if (username == null || password == null){
                vm.messsage = "Please fill in the required fields";
                return;
            }

            UserService
                //.login(username, password)
                .login({username:username, password:password})
                .then(function (response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        //$rootScope.currentUser = response.data;
                        $location.url("/profile");
                    }
                    else {
                        vm.messsage = "Login Failed";
                        console.log("User does not exist")
                    }

                });
        }

    }
})();