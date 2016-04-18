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
                //.then(function(users){
                //    $scope.users = users;
                //});
                .then(handleSuccess, handleError);
        }

        init();

        function remove(user) {
            UserService
                .deleteUserById(user._id)
                //.then (function(users){
                //    $scope.users = users;
                //});
                .then(handleSuccess, handleError);
        }

        function update(selectedUser) {
            UserService
                .updateUser(selectedUser._id, selectedUser)
                .then(handleSuccess, handleError);

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

        function add(selectedUser) {
            console.log("add user");
            console.log(selectedUser);
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
                UserService
                    .createUser(selectedUser)
                    .then(handleSuccess, handleError);
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


            $scope.selectedUser = angular.copy(user);
            $scope.selectedUser.password = '';
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
           $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }

    }
})();