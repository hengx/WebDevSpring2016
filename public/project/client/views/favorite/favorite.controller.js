(function(){
    angular
        .module("MoocApp")
        .controller("FavoriteController", favoriteController);

    function favoriteController(UserService, $location, $routeParams) {
        var vm = this;

        var userId = $routeParams.userId;
        console.log(userId);

        function init() {
            UserService
                .getFavorites()
                .then(function (response) {
                    vm.user = response.data;
                    console.log(vm.user);
                });
        }
        return init();
    }
})();