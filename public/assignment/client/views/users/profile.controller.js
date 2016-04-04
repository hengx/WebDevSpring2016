(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $location) {
        var vm = this;


        vm.username = $rootScope.currentUser.username;
        vm.password = $rootScope.currentUser.password;
        vm.email = $rootScope.currentUser.email;
        vm.firstname = $rootScope.currentUser.firstname;
        vm.lastname = $rootScope.currentUser.lastname;
        vm.updateUser = updateUser;

        function updateUser(updatedUser){
            var userId = $rootScope.currentUser._id;
            var user = {
                username : updatedUser.username,
                password: updatedUser.password,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email
            };
            UserService
                .updateUser(userId, user)
                .then(function (response) {
                    $rootScope.data = response.data;
                    $location.path("/home");
                    console.log("Profile updated");
                });
        }


        //$scope.updateUser = updateUser;
        //
        //UserService
        //    .getCurrentUser()
        //    .then(function (response) {
        //        $scope.currentUser = response.data;
        //    });
        //
        //if ($scope.currentUser != null) {
        //    $location.url("/home");
        //}
        //
        //function updateUser(currentUser) {
        //    UserService
        //        .updateUser(currentUser._id, currentUser)
        //        .then(function (response) {
        //            console.log(response);
        //            if (response) {
        //                alert("Success");
        //                $scope.currentUser = response.data;
        //            } else {
        //                alert("Fail");
        //            }
        //        });
        //
        //}

    }

})();