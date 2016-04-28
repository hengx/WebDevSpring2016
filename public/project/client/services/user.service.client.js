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
            getProfile: getProfile,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            createUser: createUser,
            findUserByCredentials:findUserByCredentials,
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
            console.log("rootscope currentUser");
            console.log($rootScope.currentUser);
        }

        function register(user) {
            console.log("user service client register");
            console.log(user);
            return $http.post("/api/project/register", user);
        }

        function logout() {
            return $http.post("/api/project/logout");

        }

        function getProfile() {
            //console.log($rootScope.currentUser._id);
            return $http.get("/api/project/profile/" + $rootScope.currentUser._id);
        }

        function findAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/admin/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/admin/user/" + userId, user);
        }

        function createUser(user) {
            console.log("create");
            console.log(user);
            return $http.post("/api/project/admin/user", user);
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/project/user?username=' + username + '&password=' + password);
        }
        function findUserByUsername(username) {
            return $http.get('/api/project/user?username=' + username);
        }

    }
})();