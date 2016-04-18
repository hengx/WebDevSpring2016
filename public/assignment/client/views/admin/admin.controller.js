(function () {
    'use strict';

    angular.module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $scope) {
        $scope.add = add;
        $scope.select = select;
        $scope.remove = remove;
        $scope.update = update;

        $scope.sortType = 'username';
        $scope.sortReverse = false;

        function init() {
            UserService
                .findAllUsers()
                .then(handleResponse, handleError);
        }

        init();

        function remove(user) {
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user) {
            if (user !== undefined){
                if (user.roles !== undefined && user._id !== undefined) {
                    user.roles = user.roles.split(',').map(function(str) {return str.trim();});
                }

                UserService
                    .updateUser(user._id, user)
                    .then(handleSuccess, handleError);
            }

        }

        function add(user) {
            if (user !== undefined) {
                if (user.roles !== undefined) {
                    user.roles = user.roles.split(',').map(function (str) {
                        return str.trim();
                    });
                }
                UserService
                    .createUser(user)
                    .then(handleSuccess, handleError);
            }
        }

        function select(user) {
            $scope.selectedUser = angular.copy(user);
        }

        function handleResponse(response) {
            $scope.users = response.data.map(function(u) {
                if (u.roles !== undefined) {
                    u.roles = u.roles.join(', ');
                } else {
                    u.roles = '';
                }
                return u;
            });
            $scope.selectedUser = undefined;
        }


        function handleSuccess(response) {
            init();
           // $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }

    }
})();