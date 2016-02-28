(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope){

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser){
            $location.url("/home");
        }
        $scope.updateUser = updateUser;

        function updateUser(user){
            $scope.message = null;
            $scope.currentUser = UserService.updateUser(user);

            if (user){
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Unable to update the user";
            }
        }

    }


})();