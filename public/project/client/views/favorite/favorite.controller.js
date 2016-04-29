(function(){
    angular
        .module("MoocApp")
        .controller("FavoriteController", favoriteController);

    function favoriteController(UserService, $routeParams) {
        var vm = this;

        var userId = $routeParams.userId;
        console.log("userId from routeParams");
        console.log(userId);

        function init() {
            UserService
                .getFavorite()
                .then(function (response) {
                    vm.favorite = response.data;
                    console.log("print vm.favorite");
                    console.log(vm.favorite);
                });
        }
        return init();
    }
})();