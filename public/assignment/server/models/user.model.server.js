var mock = require('./user.mock.json');
var uuid = require("node-uuid");

module.exports = function (app) {
    'use strict';

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredential: findUserByCredentials

    };

    return api;

    function createUser(user) {
        var newUser = {
            _id : uuid.v4(),
            username: user.username,
            password: user.password,
            email: user.email
        };
        mock.push(newUser);
        return mock;
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
                break;
            }

        }
        return mock;

    }


    function deleteUser(userId) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock.splice(u, 1);
                break;
            }
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
        console.log("User Not Found");
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