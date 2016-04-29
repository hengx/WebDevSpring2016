(function () {
    'use strict';

    angular.module("MoocApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService,$scope) {

        //var vm = this;
        $scope.add = add;
        $scope.select = select;
        $scope.remove = remove;
        $scope.update = update;

        $scope.sortType = 'username';
        $scope.sortReverse = false;


        function init() {

            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }

        init();


        function remove(user) {
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }
        //function remove(user, index) {
        //    UserService
        //        .deleteUserById(user._id)
        //        .then(function (response) {
        //            $scope.users.splice(index, 1);
        //        }, handleError);
        //}

        function update(user) {
            //if (user !== undefined) {
            //    //if (user.roles) {
            //    //    user.roles = user.roles.split(',');
            //    //}
            //}
            UserService
                .adminUpdateUser(user._id, user)
                .then(function (response) {
                    $scope.users = response.data;
                    $scope.selectedUser = null;
                    //for (var u in $scope.users) {
                    //    if ($scope.users[u]._id === user._id) {
                    //        user.roles = user.roles.toString();
                    //        $scope.users[u] = user;
                    //        $scope.selectedUser = null;
                    //    }
                    //}
                }, handleError);
            //.then(handleSuccess, handleError);

        }

        function add(user) {
            if (user !== undefined) {
                if (user.roles) {
                    user.roles = user.roles.split(',');
                }
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
            user.roles = user.roles.toString();
            $scope.selectedUser = angular.copy(user);
            $scope.selectedUser.password = '';
        }

        function handleSuccess(response) {
            console.log(response.data);
            for (var i in response.data) {
                response.data[i].roles = response.data[i].roles.toString();
            }
            $scope.users = response.data;

        }

        function handleError(error) {
            $scope.error = error;
        }

    }
})();