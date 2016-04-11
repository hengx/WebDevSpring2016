module.exports = function (app, userModel) {
    'use strict';
    app.post("/api/assignment/user", createNewUser);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=:username", findUserByUsername);
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);//find user by credential
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", removeUserById);


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
                }, function(err) {
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
                }, function(err) {
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
                res.json(user);
            }, function(err) {
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


};