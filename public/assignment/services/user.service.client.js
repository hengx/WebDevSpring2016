(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope){
        var model = {
            users: [
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
            ],
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser:setCurrentUser

        };
        return model;

        function createUser(user){
            var user = {
                username: user.username,
                password: user.password
            };
            model.users.push(user);
            return user;
        }


        function findUserByCredentials(credentials){
            for (var u in model.users){
                if (model.users[u].username === credentials.username &&
                model.users[u].password === credentials.password){
                    return model.users[u];
                }
            }
            return null;
        }

        function updateUser(currentUser){
            var user = model.findUserById(currentUser._id);
            if (user != null){
                user.firstName = currentUser.firstName;
                user.lastName = currentUser.lastName;
                user.username = currentUser.username;
                user.password = currentUser.password;
                return user;
            } else {
                return null;
            }
        }

        function getCurrentUser(){
            return $rootScope.currentUser;
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }
    }
})();