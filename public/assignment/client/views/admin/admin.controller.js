(function () {
    'use strict';

    angular.module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService,$scope) {

        var vm = this;
        vm.add = add;
        vm.select = select;
        vm.remove = remove;
        vm.update = update;

        vm.sortType = 'username';
        vm.sortReverse = false;


        function init() {

            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }

        init();

        function remove(user, index) {
            UserService
                .deleteUserById(user._id)
                .then(function (response) {
                    $scope.users.splice(index, 1);
                }, handleError);
            //.then(handleSuccess, handleError);
        }

        function update(user) {

            if (user.roles) {
                user.roles = user.roles.split(',');
            }
            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                    for (var u in $scope.users) {
                        if ($scope.users[u]._id === user._id) {
                            user.roles = user.roles.toString();
                            $scope.users[u] = user;
                        }
                    }
                }, handleError);
            //.then(handleSuccess, handleError);

        }

        function add(user) {
            console.log("add user");
            console.log(user);

            if (user.roles) {
                user.roles = user.roles.split(',');
            }
            UserService
                .createUser(user)
                .then(function (response) {
                    if (response.data !== undefined) {
                        $scope.users.push(response.data);
                    }
                });
            user.roles = user.roles.join();

        }

        function select(user) {
            console.log("select user");
            console.log(user);

            user.roles = user.roles.toString();

            vm.user = angular.copy(user);
            vm.user.password = '';
        }

        function handleSuccess(response) {
            //init();
            console.log(response.data);
            for (var i in response.data) {
                response.data[i].roles = response.data[i].roles.toString();
            }
        $scope.users = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }

    }
})();
