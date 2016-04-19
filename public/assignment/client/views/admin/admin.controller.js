(function () {
    'use strict';

    angular.module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {

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
                //.then(function(users){
                //    $scope.users = users;
                //});
                .then(handleSuccess, handleError);
        }

        init();

        function remove(user, index) {
            UserService
                .deleteUserById(user._id)
                .then(function (response) {
                    vm.users.splice(index, 1);
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
                    for (var u in vm.users) {
                        if (vm.users[u]._id === user._id) {
                            user.roles = user.roles.toString();
                            vm.users[u] = user;
                        }
                    }
                }, handleError);
            //.then(handleSuccess, handleError);

        }

        //UserService
        //    .updateUser(selectedUser._id, selectedUser)
        //    //.then(function(users){
        //    $scope.users = users;
        //    $scope.selectedUser.username = "";
        //    $scope.selectedUser.password = "";
        //    $scope.selectedUser.firstName = "";
        //    $scope.selectedUser.lastName = "";
        //    $scope.selectedUser.roles = "";
        //    delete $scope.selectedUser._id;
        //});


        //if (user !== undefined){
        //        if (user.roles !== undefined && user._id !== undefined) {
        //            user.roles = user.roles.split(',').map(function(string) {return string.trim();});
        //        }
        //
        //        UserService
        //            .updateUser(selectedUser._id, user)
        //            .then(handleSuccess, handleError);
        //    }
        //
        //}

        function add(user) {
            console.log("add user");
            console.log(user);
            //UserService
            //    .createUser(selectedUser)
            //    .then(function(user){
            //        $scope.user = user;
            //    });

            //if (selectedUser !== undefined) {
            //    if (selectedUser.roles !== undefined) {
            //        selectedUser.roles = selectedUser.roles.split(',').map(function (string) {
            //            return string.trim();
            //        });
            //    }
            if (user.roles) {
                user.roles = user.roles.split(',');
            }
            UserService
                .createUser(user)
                //.then(handleSuccess, handleError);
                .then(function (response) {
                    vm.users.push(response.data);


                });
            //.then(function(users){
            //    $scope.users = users;
            //})
            //}
        }

        function select(user) {
            console.log("select user");
            console.log(user);
            //UserService
            //    .findUserById(user._id)
            //    .then(function(u){
            //        $scope.selectedUser = u;
            //        $scope.selectedUser.password = '';
            //    });

            user.roles = user.roles.toString();

            vm.user = angular.copy(user);
            vm.user.password = '';
        }

        //function handleResponse(response) {
        //    $scope.users = response.data.map(function(user) {
        //        if (user.roles !== undefined) {
        //            user.roles = user.roles.join(', ');
        //        } else {
        //            user.roles = '';
        //        }
        //        return user;
        //    });
        //    $scope.selectedUser = undefined;
        //}
        //
        //
        function handleSuccess(response) {
            //init();
            for (var i in response.data) {
                response.data[i].roles = response.data[i].roles.toString();
            }
            vm.users = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }

    }
})();