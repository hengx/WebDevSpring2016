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

    app.get("/api/project/profile/:userId", auth, profile);
    app.post('/api/project/admin/user', admin, createNewUser);
    app.get('/api/project/admin/user/:userId', admin, adminFindUserById);
    app.get('/api/project/admin/user', admin, getUsers);
    app.put('/api/project/admin/user/:userId', auth, updateUser);
    app.delete('/api/project/admin/user/:userId', admin, removeUserById);


    function login(req, res) {
        var credentials = req.body;
        console.log("login service server, credentials");
        console.log(credentials);
        //var user = userModel.login(credentials);
        //req.session.currentUser = user;
        //res.json(user);
        userModel.findUserByCredentials(credentials)
            .then(
                function (doc){
                    req.session.currentUser = doc;
                    console.log("session currentUser");
                    console.log(req.session.currentUser);
                    res.json(doc);
                },
                // send error if promise rejected
                function (err){
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        console.log("loggedin, server");
        console.log(req.session.currentUser);
        res.json(req.isAuthenticated() ? req.session.currentUser : '0');
    }

    function logout(req, res) {
        req.session.destroy();
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        //console.log("server side register req");
        //console.log(req);
        var newUser = req.body;
        console.log("server side register");
        console.log(newUser);
        newUser.password = bcrypt.hashSync(newUser.password);

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    console.log("server side, service, find user by username");
                    console.log(user);
                    if (user) {
                        res.json(null);
                    } else {
                        console.log("server side register create user");
                        console.log(user);
                        return userModel.createUser(newUser);
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
                            console.log("user service server, login");
                            console.log(user);
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

        //user = userModel.register(user);
        //req.session.currentUser = user;
        //res.json(user);
    }

    function profile(req, res) {
        var userId = req.params.userId;
        var user = null;
        //var user = userModel.findUserById(userId);
        //var likedCourseIds = user.likes;
        //var courses = courseModel.findCoursesByCourseIds(likedCourseIds);
        //user.likesCourses = courses;
        //res.json(user);
        ////console.log(user);

        userModel.findUserById(userId)
            .then(
                //first retrieve the user by userId
                function (doc) {
                    user = doc;
                    //fetch courses this user likes
                    return courseModel.findCoursesByCourseIds(doc.likes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                //fetch courses this user likes
                function (courses){
                    //list of courses this user likes
                    //courses are not stored in database, only added for UI rendering
                    user.likesCourses = courses;
                    res.json(user);
                },

                //send error if promise rejected
                function (err){
                    res.status(400).send(err);
                }
            )
    }


    function createNewUser(req, res) {
        var user = req.body;
        console.log('add new user');
        console.log(user);
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


    function getUsers(req, res) {
        console.log('get users');
        var user = req.body;

        if (user.username && user.password) {
            findUserByCredentials(req, res);
        } else if (user.username) {
            findUserByUsername(req, res);
        }
        else {
            console.log('get All users');
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

        var username = req.body.username;
        var password = req.body.password;

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
        var username = req.body.username;
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
            .then(function (user) {
                res.json(user);
            });
    }




    function updateUser(req, res) {
        var userId = req.params.userId;
        var updatedUser = req.body;
        console.log("user server service");
        console.log(userId);
        console.log(updatedUser);

        if (updatedUser.password && updatedUser.password !== ''){
            updatedUser.password = bcrypt.hashSync(updatedUser.password);
        } else {
            delete updatedUser.password;
        }

        userModel
            .updateUser(userId, updatedUser)
            .then(function (user) {
                user['_id'] = userId;
                res.json(user);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function removeUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (users) {
                res.json(users);
            });

    }

    function localStrategy(username, password, done) {
        console.log("password");
        console.log(password);
        userModel
            .findUserByCredentials({username: username, password:password})
            .then(
                function (user) {
                    console.log("1");
                    console.log(user);
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    console.log("err");
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
        if (req.isAuthenticated()  && req.user.roles.indexOf("admin") >= 0) {
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

};

