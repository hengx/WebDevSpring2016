var mock = require('./user.mock.json');
var uuid = require("node-uuid");

module.exports = function () {
    'use strict';

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials

    };

    return api;

    function createUser(user) {
        user._id = uuid.v4();
        mock.push(user);
        return user;
    }


    function findAllUsers() {
        return mock;
    }

    function findUserById(userId) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                return mock[u];
            }
        }
        console.log("User Not Found");
        return null;

    }

    function updateUser(userId, updatedUser) {

        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock[u].firstName = updatedUser.firstName;
                mock[u].lastName = updatedUser.lastName;
                mock[u].username = updatedUser.username;
                mock[u].password = updatedUser.password;
                mock[u].email = updatedUser.email;
                return mock[u];
            }

        }
        return null;

    }


    function deleteUser(userId) {
        var index = -1;
        for (var u in mock) {
            if (mock[u]._id === userId) {
                index = u;
                break;
            }
        }
        if (index != -1){
            mock.splice(index, 1);
        }
        return mock;

    }



    function findUserByUsername(username) {
        console.log("username");
        console.log(username);
        for (var u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        console.log("credentials");
        console.log(credentials);

        for (var u in mock) {
            if (mock[u].username === credentials.username && mock[u].password === credentials.password) {
               return mock[u];
            }
        }
        console.log("User Not Found");
        return null;
    }


};