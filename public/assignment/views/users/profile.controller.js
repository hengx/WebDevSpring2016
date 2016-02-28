(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {
        //retrieve the currently logged in user
        $scope.currentUser = $rootScope.currentUser;
        if (!$scope.currentUser) {
            $location.url("/home");
        }
        $scope.update = update;

        function update(user) {
            $scope.currentUser = UserService.updateUser(user._id, user, function () {
                if (user) {
                    alert("User updated successfully");
                } else {
                    alert("User update failed");
                }
            });


        }

    }


})();