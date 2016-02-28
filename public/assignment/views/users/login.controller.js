(function (){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService,$location, $rootScope){
        $scope.login = login;

        function login(user){
            var user = UserService.findUserByCredentials({username: user.username, password: user.password});
            if (user){
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }

    }


})();