(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;

        vm.$location = $location;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function(response){
                        UserService.setCurrentUser(null);
                        $location.url("/login");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }

})();