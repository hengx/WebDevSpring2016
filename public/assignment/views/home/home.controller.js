/**
 * Created by hengxu on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);
    function HomeController($scope) {
        $scope.homeHello = "Hello from HomeController"
    }
})();