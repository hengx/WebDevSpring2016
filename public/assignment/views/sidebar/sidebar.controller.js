(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($location, $scope) {
        $scope.$location = $location;
    }
})();