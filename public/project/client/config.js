(function(){
    angular
        .module("MoocApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html"
            })
            .otherwise ({
                redirectTo: "/home"
            });
    }
})();