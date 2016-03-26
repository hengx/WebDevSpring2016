(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {
        //retrieve the currently logged in user
        $scope.currentUser = $rootScope.currentUser;
        $scope.update = update;

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        function update(currentUser) {
            //var updatedUser = {};
            //updatedUser.username = $scope.username;
            //updatedUser.password = $scope.password;
            //updatedUser.firstName = $scope.firstName;
            //updatedUser.lastName = $scope.lastName;
            //updatedUser.email = $scope.email;


            UserService.updateUser(currentUser._id, currentUser, function (updatedUser) {
                $rootScope.currentUser = updatedUser;
                alert("User updated successfully");
            });


        }

    }

})();