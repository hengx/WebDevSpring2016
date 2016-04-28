(function () {
    angular
        .module("MoocApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location, $rootScope) {
        var vm = this;

        vm.updateUser = updateUser;
        vm.message = null;



        function init() {
            UserService.getCurrentUser()
                .then(function (response){
                    if (response.data){
                        vm.currentUser = response.data;
                        vm.currentUser.password = '';
                    }
                });

        }

        return init();


        function updateUser(updatedUser) {
            console.log("print updatedUser");
            console.log(updatedUser);

            if (updatedUser == null || updatedUser.username == null ||
                updatedUser.password == null) {
                vm.message = "Required field cannot be empty";
                return;
            }

            console.log("here");
            console.log(updatedUser._id);
            console.log(updatedUser);
            UserService
                .updateUser(updatedUser._id, updatedUser)
                .then(function (response) {
                    if (response.data) {
                        console.log("update user in controller, response.data");
                        console.log("response.data");
                        //vm.currentUser = response.data;
                        vm.message = "User profile updated successfully";
                    }
                    else {
                        vm.message = "User profile failed to update";
                        $location.path("/home");
                    }
                });
        }
    }


})();