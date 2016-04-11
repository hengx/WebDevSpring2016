var q = require("q");
var uuid = require("node-uuid");

module.exports = function (db, mongoose) {
    'use strict';

    var userSchema = require("./user.schema.server.js")(mongoose);

    var userModel = mongoose.model('userModel', userSchema);

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
        var deferred = q.defer();
        userModel
            .create(user, function (err, newUser) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(newUser);
                }
            });
        return deferred.promise;
        //user._id = uuid.v4();
        //mock.push(user);
        //return user;
    }


    function findAllUsers() {
        var deferred = q.defer();
        userModel
            .find(function (err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });
        return deferred.promise;
        //return mock;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        userModel
            .findById({_id: userId}, function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
        //for (var u in mock) {
        //    if (mock[u]._id === userId) {
        //        return mock[u];
        //    }
        //}
        //console.log("User Not Found");
        //return null;

    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        userModel.update(
            {_id: userId},
            {$set: user},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    userModel.findById(userId, function (err, updatedU) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(updatedU);
                        }
                    });
                }
            });

        return deferred.promise;

        //for (var u in mock) {
        //    if (mock[u]._id === userId) {
        //        mock[u].firstName = updatedUser.firstName;
        //        mock[u].lastName = updatedUser.lastName;
        //        mock[u].username = updatedUser.username;
        //        mock[u].password = updatedUser.password;
        //        mock[u].email = updatedUser.email;
        //        return mock[u];
        //    }
        //
        //}
        //return null;

    }


    function deleteUser(userId) {
        var deferred = q.defer();
        userModel
            .remove({_id: userId}, function(err, status){
                if (err){
                    deferred.reject(err);
                }else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
        //var index = -1;
        //for (var u in mock) {
        //    if (mock[u]._id === userId) {
        //        index = u;
        //        break;
        //    }
        //}
        //if (index != -1) {
        //    mock.splice(index, 1);
        //}
        //return mock;

    }


    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel
            .find({username: username},
                function(err, user){
                    if (err){
                        deferred.reject(err);
                    }else {
                        deferred.resolve(user);
                    }
                });
        return deferred.promise;

        //for (var u in mock) {
        //    if (mock[u].username === username) {
        //        return mock[u];
        //    }
        //}
        //return null;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        userModel
            .find({username : credentials.username, password: credentials.password},
            function (err, user){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;

        //for (var u in mock) {
        //    if (mock[u].username === credentials.username && mock[u].password === credentials.password) {
        //        return mock[u];
        //    }
        //}
        //console.log("User Not Found");
        //return null;
    }


};