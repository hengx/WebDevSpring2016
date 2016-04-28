var mock = require("./user.mock.json");

// load q promise library
var q = require("q");
var bcrypt = require('bcrypt-nodejs');

// pass db and mongoose reference to model
module.exports = function (db, mongoose) {
    'use strict';

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);


    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        userLikesCourse: userLikesCourse,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername

    };
    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        // find one retrieves one document

        UserModel.findOne(
            {
                username: credentials.username
            },

            function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    if (bcrypt.compareSync(credentials.password, user.password)) {
                        deferred.resolve(user);
                    } else {
                        deferred.resolve(false);
                    }
                }
            });
        //console.log("model server");
        //console.log(credentials);
        //for (var u in mock){
        //    if (mock[u].username === credentials.username && mock[u].password === credentials.password){
        //        return mock[u];
        //    }
        //}
        //return null;
        return deferred.promise;
    }

    function createUser(user) {
        console.log('1 create user, model, server');
        console.log(user);
        var deferred = q.defer();
        console.log('2 create user, model, server');
        console.log(user);
        // insert new user with mongoose user model's create()
        delete user._id;
        UserModel.create(user, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                console.log("create, server, model");
                deferred.resolve(doc);
            }
            //console.log(doc);
        });
        // return a promise
        return deferred.promise;

        //user._id = "ID_" + (new Date()).getTime();
        //mock.push(user);
        //return user;
    }


    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

        //for (var u in mock){
        //    if (mock[u]._id === userId){
        //        return mock[u];
        //    }
        //}
        //return null;

    }


    function findUsersByIds(userIds) {
        var deferred = q.defer();

        //find all users in an array of user IDs
        UserModel.find({
            _id: {$in: userIds}
        }, function (err, users){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
        //var users = [];
        //for (var u in userIds) {
        //    var user = findUserById(userIds[u]);
        //    if (user) {
        //        users.push({
        //            username: user.username,
        //            _id: user._id
        //        });
        //    }
        //}
        //return users;

    }

    function userLikesCourse(userId, course){
        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function(err, doc){
            // reject promise if error
            if (err){
                deferred.reject(err);
            } else {
                // add course id to user courseIdsLikedByUser
                doc.courseIdsLikedByUser.push (course.courseId);

                //save user
                doc.save (function (err, doc) {
                    if (err){
                        deferred.reject(err);
                    } else {
                        // resolve promise with user
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel
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

    function updateUser(userId, user) {
        //console.log("UID");
        //console.log(userId);
        var deferred = q.defer();
        delete user._id;
        UserModel.update(
            {_id: userId},
            {$set: user},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("updatedU");

                    UserModel.findById(userId, function (err, updatedU) {
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
        UserModel
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
        var deferred = q.defer();
        UserModel
            .findOne({username: username},
                function(err, user){
                    if (err){
                        deferred.reject(err);
                    }else {
                        deferred.resolve(user);
                    }
                });
        return deferred.promise;

    }

};