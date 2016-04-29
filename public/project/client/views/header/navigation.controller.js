(function(){
    angular
        .module("MoocApp")
        .controller("NavigationController", navigationController);

    function navigationController($location, $rootScope, UserService){
        var vm = this;
        vm.logout = logout;
        vm.favorite = favorite;

        function init(){
            vm.$location = $location;

        }
        init();

        function favorite() {
            var userId = $rootScope.currentUser._id;
            $location.url('/favorite/'+userId)
        }

        function logout(){
            UserService
                .logout()
                .then(function(){
                    UserService
                        .setCurrentUser(null);
                    $location.url("/home");

                });
        }
    }
})();