var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app, courseModel, userModel) {
    'use strict';

    var auth = authorized;
    var admin = isAdmin;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/project/login", passport.authenticate('local'), login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/api/project/profile/:userId", profile);

    app.put('/api/project/user/:userId', updateUser);
    app.get("/api/project/favorite/:userId", getFavorite);

    app.post('/api/project/admin/user', admin, adminCreateNewUser);
    app.get('/api/project/admin/user/:userId', admin, adminFindUserById);
    app.get('/api/project/admin/user', admin, adminGetUsers);
    app.put('/api/project/admin/user/:userId', auth, adminUpdateUser);
    app.delete('/api/project/admin/user/:userId', admin, adminRemoveUserById);


    function login(req, res) {
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;

                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        res.json(req.isAuthenticated() ? req.session.currentUser : '0');
    }

    function logout(req, res) {
        req.session.destroy();
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser)
                            .then(function (doc) {
                                req.session.currentUser = doc;
                                return doc;
                            }, function (err) {
                                res.status(400).send(err);
                            })
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {

                    if (user) {
                        req.login(user, function (err) {

                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function profile(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (err){
                res.status(400).send(err);
            });

    }

    function getFavorite(req, res) {
        var userId = req.params.userId;
        var user = null;

        userModel.findUserById(userId)
            .then(
                //first retrieve the user by userId
                function (doc) {
                    user = doc;
                    //fetch courses this user coursesIdLiked
                    return courseModel.findCoursesByCourseIds(doc.courseIdsLikedByUser);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                //fetch courses this user coursesIdLiked
                function (courses) {
                    console.log("check if the get fav works in user server service, print courses");
                    console.log(courses);
                    //list of courses this user liked
                    //courses are not stored in database, only added for UI rendering
                    user.coursesLikedByUser = courses;

                    console.log("check if the get fav works in user server service, print user");
                    console.log(user);
                    res.json(user);
                },

                //send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var updatedUser = req.body;

        if (updatedUser.password && updatedUser.password !== '') {
            updatedUser.password = bcrypt.hashSync(updatedUser.password);
        } else {
            delete updatedUser.password;
        }
        userModel
            .updateUser(userId, updatedUser)
            .then(function (user) {
                console.log("print from user server service, after update value");
                console.log(user);

                user['_id'] = userId;
                req.session.currentUser = user;
                res.json(user);
            }, function (err) {
                res.status(400).send(err);
            });
    }


    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    //console.log("err");
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }


    function isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf("admin") >= 0) {
            next();
        } else {
            res.status(403);
        }
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }


    function adminCreateNewUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                })
    }


    function adminGetUsers(req, res) {

        if (req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        } else if (req.query.username) {
            findUserByUsername(req, res);
        }
        else {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                });
        }

    }

    function findUserByCredentials(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        if (username != null && password != null) {
            var credentials = {
                username: username,
                password: password
            };
            userModel
                .findUserByCredentials(credentials)
                .then(function (user) {
                    res.json(user);
                }, function (err) {
                    res.status(400).send(err);
                });

        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            });
    }


    function adminFindUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
    }


    function adminUpdateUser(req, res) {
        //    var userId = req.params.id;
        //    var updatedUser = req.body;
        //
        //    if (updatedUser.password && updatedUser.password !== ''){
        //        updatedUser.password = bcrypt.hashSync(updatedUser.password);
        //    } else {
        //        delete updatedUser.password;
        //    }
        //
        //    userModel
        //        .updateUser(userId, updatedUser)
        //        .then(function (user) {
        //            user['_id'] = userId;
        //            res.json(user);
        //        }, function (err) {
        //            res.status(400).send(err);
        //        });
        //}
        var userId = req.params.userId;
        var newUser = req.body;

        if (newUser.password && newUser.password !== '') {
            newUser.password = bcrypt.hashSync(newUser.password);
        } else {
            delete newUser.password;
        }
        if (typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        userModel
            .updateUser(userId, newUser)
            .then(function (user) {
                    user['_id'] = userId;
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function adminRemoveUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (users) {
                    return userModel.findAllUsers();
                }, function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(400).send(err);
            });

    }


};

