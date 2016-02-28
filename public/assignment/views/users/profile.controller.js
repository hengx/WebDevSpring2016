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
            UserService.updateUser(currentUser._id, currentUser, function (currentUser) {
                //$rootScope.currentUser = currentUser;
                alert("User updated successfully");
                //if (currentUser != null) {
                //    alert("User updated successfully");
                //    $rootScope.currentUser = currentUser;
                //} else {
                //    alert("User update failed");
                //}
            });

        }

    }


})();