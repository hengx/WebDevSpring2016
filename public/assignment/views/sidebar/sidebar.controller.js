(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($location, $scope, UserService){
        $scope.$location = $location;
        $scope.logout = logout;
    }
})();