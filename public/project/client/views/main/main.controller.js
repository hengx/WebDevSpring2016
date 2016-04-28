(function () {
    'use strict';
    angular
        .module("MoocApp")
        .controller("MainController", MainController);


    function MainController($location, $scope) {
        $scope.$location = $location;

    }

})();