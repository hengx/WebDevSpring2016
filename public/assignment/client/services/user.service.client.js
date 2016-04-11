(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser

        };
        return api;


        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);

        }

        function findUserByCredentials(username, password) {
            //var deferred = $q.defer();
            //$http
            //    .get("/api/assignment/user?username=" + username + "&password=" + password)
            //    .success(function(res){
            //        deferred.resolve(res);
            //    });
            //return deferred.promise;
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            //var deferred = $q.defer();
            //$http
            //    .get("/api/assignment/user")
            //    .success(function(res){
            //        deferred.resolve(res);
            //    });
            //return deferred.promise;

            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            //var deferred = $q.defer();
            //$http
            //    .post("/api/assignment/user", user)
            //    .success(function(res){
            //        deferred.resolve(res);
            //    });
            //return deferred.promise;

            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }


    }
})();