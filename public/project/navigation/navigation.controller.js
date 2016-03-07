/**
 * Created by hengxu on 3/1/16.
 */

(function(){
    angular
        .module("MoocApp")
        .controller("NavController", navController);

    function navController($scope, $location) {
        $scope.$location = $location;
    }
})();