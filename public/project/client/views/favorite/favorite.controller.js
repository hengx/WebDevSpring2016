(function(){
    angular
        .module("MoocApp")
        .controller("FavoriteController", favoriteController);

    function favoriteController(UserService, $location, $routeParams) {
        var vm = this;

        var username = $routeParams.username;
        console.log(username);

        function init() {
            UserService
                .getFavorite()
                .then(function (response) {
                    vm.favorite = response.data;
                    console.log(vm.favorite);
                });
        }
        return init();
    }
})();