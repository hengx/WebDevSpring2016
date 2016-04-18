var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports = function (app, userModel) {
    'use strict';

    var auth = authorized;
    var admin = isAdmin;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    //app.post("/api/assignment/user", createNewUser);
    //app.get("/api/assignment/user", getUsers);
    //app.get("/api/assignment/user/:id", findUserById);
    //app.get("/api/assignment/user?username=:username", findUserByUsername);
    //app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);//find user by credential
    //app.put("/api/assignment/user/:id", updateUser);
    //app.delete("/api/assignment/user/:id", removeUserById);

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/register', register);
    app.post('/api/assignment/logout', logout);

    app.post('/api/assignment/admin/user', admin, createNewUser);
    app.get('/api/assignment/admin/user/:id', admin, adminFindUserById);
    app.get('/api/assignment/user/:id', auth, findUserById);
    app.get('/api/assignment/admin/user', admin, getUsers);
    app.put('/api/assignment/admin/user/:id', auth, updateUser);
    app.delete('/api/assignment/admin/user/:id', admin, removeUserById);


    function createNewUser(req, res) {
        var user = req.body;
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


    function findUserById(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

    function adminFindUserById(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }


    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            });
    }


    function updateUser(req, res) {
        var userId = req.params.id;
        var updatedUser = req.body;

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
        var userId = req.params.id;
        userModel
            .deleteUser(userId)
            .then(function (users) {
                res.json(users);
            });

    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password:password})
            .then(
                function (user) {
                    console.log("1")
                    console.log(user)
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    console.log("err")
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

    function register(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
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



    function isAdmin(req, res, next) {
        if (req.isAuthenticated()  && req.user.roles.indexOf("admin") > 0) {
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

    function login(req, res) {
        console.log("+++"+req);
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        console.log("loggedin");
        console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : '0');
    }


};