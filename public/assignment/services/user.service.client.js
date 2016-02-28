(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope){
        //list of current users
        var currentUsers = [];
            currentUsers = [
                {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]                },
                {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]                },
                {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]                },
                {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]                }
            ];

        var model = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser:setCurrentUser

        };
        return model;


        function findUserByCredentials(username, password, callback){
            for (var u in currentUsers){
                if (currentUsers[u].username == username &&
                    currentUsers[u].password == password){
                    callback(currentUsers[u]);
                    //return;
                } else {
                    callback(null);
                    //return;
                }
            }
        }


        function findAllUsers(callback){
            callback(currentUsers);
        }

        /**
         *
         * @param user
         * @param callback
         */
        function createUser(user, callback){
            user._id = (new Date).getTime();
            currentUsers.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback){
            for (var u in currentUsers){
                if (currentUsers[u]._id == userId){
                    currentUsers.splice(u, 1);
                    break;
                }
            }
            callback(currentUsers);

        }

        function updateUser(userId, user, callback){
            for (var u in currentUsers){
                if (currentUsers[u]._id == userId){
                    currentUsers[u].firstName = user.firstName;
                    currentUsers[u].lastName = user.lastName;
                    currentUsers[u].username = user.username;
                    currentUsers[u].password = user.password;
                   break;
                }
            }
            callback(currentUsers);
        }

        function getCurrentUser(){
            return $rootScope.currentUser;
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }
    }
})();