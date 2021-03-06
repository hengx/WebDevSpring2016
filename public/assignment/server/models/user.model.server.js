var q = require("q");
//var uuid = require("node-uuid");
var bcrypt = require('bcrypt-nodejs');


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
        console.log("server model : create new user");
        console.log(user);
        var deferred = q.defer();
        delete user._id;
        userModel
            .create(user, function (err, newUser) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("server side newUser");
                    console.log(newUser);
                    deferred.resolve(newUser);
                }
            });
        return deferred.promise;
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

    }

    function updateUser(userId, user) {
        //console.log("UID");
        //console.log(userId);
        var deferred = q.defer();
        delete user._id;
        userModel.update(
            {_id: userId},
            {$set: user},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("updatedU");

                    userModel.findById(userId, function (err, updatedU) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            console.log(updatedU);
                            deferred.resolve(updatedU);
                        }
                    });
                }
            });

        return deferred.promise;


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

    }


    function findUserByUsername(username) {
        //console.log("find user by user name, server model");
        //console.log(username);
        var deferred = q.defer();
        userModel
            .findOne({username: username},
                function(err, user){
                    if (err){
                        deferred.reject(err);
                    }else {
                        //console.log("find one, server model");
                        //console.log(user);
                        deferred.resolve(user);
                    }
                });
        return deferred.promise;

    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        userModel
            .findOne({username : credentials.username},
            function (err, user){
                if (err){
                    deferred.reject(err);
                } else {
                    if (bcrypt.compareSync(credentials.password, user.password)){
                        deferred.resolve(user);
                    } else {
                        deferred.resolve(false);
                    }

                }
            });
        return deferred.promise;

    }


};