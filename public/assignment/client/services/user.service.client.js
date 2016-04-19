(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findUserById:findUserById,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            login: login,
            register: register,
            logout: logout

        };
        return api;


        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);

        }

        function findUserById(userId){
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user) {
            console.log("create");
            console.log(user);
            return $http.post("/api/assignment/admin/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }
        function register(user){
            return $http.post('/api/assignment/register', user);
        }

        function login(user){
            return $http.post('/api/assignment/login', user);
        }

        function logout(){
            return $http.post('/api/assignment/logout');
        }


    }
})();