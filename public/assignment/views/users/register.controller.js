(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope){

        $scope.register = register;

        function register(user){
            if (user == null || !user.username || !user.password || !user.password2 ||
                user.password != user.password2){
                return;
            }

            var newUser = {
                username: user.username,
                password: user.password,
                email: user.email
            };

            UserService.createUser(newUser, function(user){
                $rootScope.currentUser = user;
                $location.url("/profile");
            });

        }
    }
})();