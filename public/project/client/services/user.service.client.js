(function () {
    'use strict';
    angular
        .module("MoocApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            login: login,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            register: register,
            logout: logout,
            getFavorite: getFavorite,
            adminFindUserById: adminFindUserById,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            adminUpdateUser: adminUpdateUser,
            createUser: createUser,
            //findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername
        };
        return api;


        function login(credentials) {
            //console.log(credentials);
            return $http.post("/api/project/login", credentials);
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
            //console.log("rootscope currentUser");
            //console.log($rootScope.currentUser);
        }

        function register(user) {
            //console.log("user service client register");
            //console.log(user);
            return $http.post("/api/project/register", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function getFavorite() {
            console.log("print current user in user service client");
            console.log($rootScope.currentUser);
            return $http.get("/api/project/favorite/" + $rootScope.currentUser._id);
        }

        function adminFindUserById (userId) {
            return $http.get("/api/project/admin/user/" + userId);
        }

        function findAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function deleteUserById(userId) {
            //console.log("user service client, delete");
            //console.log(userId);
            return $http.delete("/api/project/admin/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function adminUpdateUser(userId, user){
            return $http.put("/api/project/admin/user/" + userId, user);
        }

        function createUser(user) {
            //console.log("create");
            //console.log(user);
            return $http.post("/api/project/admin/user", user);
        }

        //function findUserByCredentials(username, password) {
        //    return $http.get('/api/project/user?username=' + username + '&password=' + password);
        //}
        function findUserByUsername(username) {
            return $http.get('/api/project/user?username=' + username);
        }

    }
})();