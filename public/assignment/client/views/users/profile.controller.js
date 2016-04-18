(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $location) {
        var vm = this;


        //vm.username = $rootScope.currentUser.username;
        //vm.password = $rootScope.currentUser.password;
        //vm.email = $rootScope.currentUser.email;
        //vm.firstname = $rootScope.currentUser.firstname;
        //vm.lastname = $rootScope.currentUser.lastname;
        vm.updateUser = updateUser;
        vm.message = null;

        function init(){
            vm.currentUser = UserService.getCurrentUser();
        }
        init();


        function updateUser(updatedUser){
            if (updatedUser == null || updatedUser.username == null ||
                updatedUser.password == null){
                vm.message = "Required field cannot be empty";
                return;
            }

            UserService
                .updateUser(updatedUser._id, updatedUser)
                .then(function (response) {
                    if (response.data){
                        vm.message = "User profile updated successfully";
                    }
                    else {
                        vm.message = "User profile failed to update";
                        $location.path("/home");
                    }
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