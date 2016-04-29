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
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        delete user._id;
        UserModel.create(user, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;

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

    }


    function findUsersByIds(userIds) {
        var deferred = q.defer();

        //find all users in an array of user IDs
        UserModel.find({
            _id: {$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;

    }

    //return user who likes this course
    function userLikesCourse(userId, course) {
        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add course id to user courseIdsLikedByUser
                console.log("user model server, print course to see if its id");
                console.log(course);
                doc.courseIdsLikedByUser.push(course.courseId);

                //save user
                doc.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        // resolve promise with user
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
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

        var deferred = q.defer();
        delete user._id;
        UserModel.findByIdAndUpdate(
            {_id: userId},
            {$set: user},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);

                }
            });

        return deferred.promise;

    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel
            .remove({_id: userId}, function (err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;

    }


    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel
            .findOne({username: username},
                function (err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
        return deferred.promise;

    }

};