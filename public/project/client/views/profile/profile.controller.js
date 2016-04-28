(function () {
    angular
        .module("MoocApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location, $routeParams) {
        var vm = this;
       // var username = $routeParams.username;
        console.log("username");
        console.log(username);
        vm.updateUser = updateUser;
        vm.message = null;

        function init() {
            UserService
                .getProfile()
                .then(function(response){
                    console.log("profile response");
                    console.log(response.data);

                    vm.profile = response.data;
                    console.log("vm.profile");
                    console.log(vm.profile);
                    vm.profile.password = '';
                });

            //vm.currentUser = UserService.getCurrentUser();
            //console.log("current user in profile");
            //console.log(vm.currentUser);
            //vm.currentUser.password = '';

        }

        return init();

        function updateUser(updatedUser){
            console.log("print updatedUser");
            console.log(updatedUser);

            if (updatedUser == null || updatedUser.username == null ||
                updatedUser.password == null){
                vm.message = "Required field cannot be empty";
            }

            console.log("here");
            console.log(updatedUser._id);
            console.log(updatedUser);
            UserService
                .updateUser(updatedUser._id, updatedUser)
                .then(function (response) {
                    if (response.data){
                        console.log("update user in controller, response.data");
                        console.log("response.data");
                        vm.profile = response.data;
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