(function(){
    angular
        .module("MoocApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/footer", {
                templateUrl: "footer/footer.view.html"
            })
            .when("/search", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:name", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .when("/detail/:id", {
                templateUrl: "search/detail.view.html",
                controller: "DetailController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();