(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);
    function HomeController() {
        console.log("Hello from HomeController");
    }
})();