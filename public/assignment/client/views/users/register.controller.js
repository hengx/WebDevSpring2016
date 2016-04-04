(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;
        vm.$location = $location;
        function init(){

        }
        init();

        function register(user) {

            console.log("user for register");
            console.log(user);

            //if (user.username == null || user.password == null || user.password2 == null || user.email == null) {
            //    alert("Please fill all the information");
            //    return;
            //}
            //if (user.password != user.password2) {
            //    alert("Passwords do not match");
            //    return;
            //}

            //UserService
            //    .createUser($scope.user)
            //    .then(function (newU) {
            //        $rootScope.currentUser = newU;
            //        $location.url("/profile");
            //    });


                var newUser = {
                    username: user.username,
                    password: user.password,
                    email: user.email

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