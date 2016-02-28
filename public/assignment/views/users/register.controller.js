(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope) {

        $scope.register = register;

        function register(user) {

            if (user == null || !user.username || !user.password || !user.password2 ||
                user.password != user.password2) {
                alert("Please enter valid usename and password")
                return;

            }

            UserService.findUserByCredentials($scope.user.username, $scope.user.password, function (user) {
                if (user != null) {
                    alert("user exits!");
                    $location.url("/");
                }
            });

            var newUser = {
                username: $scope.user.username,
                password: $scope.user.password,
                email: $scope.user.email
            };


            UserService.createUser(newUser, function (user) {
                $rootScope.currentUser = user;
                $location.url("/profile");
            });

        }
    }
})();