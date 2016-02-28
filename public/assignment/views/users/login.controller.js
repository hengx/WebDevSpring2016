(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login() {
            UserService.findUserByCredentials($scope.username, $scope.password, function (user) {

                if (user != null) {
                    $rootScope.currentUser = user;
                    UserService.setCurrentUser(user);
                    $location.url("/profile");
                }
                else {
                    alert("Invalid username or password.");
                }
            });

        }

    }


})();