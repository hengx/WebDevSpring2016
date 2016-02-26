(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope){
        $scope.message = null;
        $scope.register = register;

        function register(user){
            $scope.message = null;
            if (user == null){
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username){
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2){
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2){
                $scope.message = "Passwords do not match";
                return;
            }
            var user = UserService.findUserByCredentials(user);
            if (user != null){
                $scope.message = "User already exists";
                return;
            }

            var newUser = UserService.createUser($scope.user);
            $rootScope.currentUser = newUser;
            $location.url("/profile");
        }
    }
})();