module.exports = function (app, userModel) {
    'use strict';
    app.post("/api/assignment/user", createNewUser);//createUser
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=:username", findUserByUsername);
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);//find user by credential
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", removeUserById);


    function createNewUser(req, res) {
        var user = req.body;
        var newUser = userModel.createUser(user);
        res.json(newUser);
    }


    function getUsers(req, res) {
        if (req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        } else if (req.query.username) {
            findUserByUsername(req, res);
        }
        else {
            var users = userModel.findAllUsers();
            res.json(users);

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
            console.log(credentials);
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);


        }
    }


    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);


    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }


    function updateUser(req, res) {
        var userId = req.params.id;
        var updatedUser = req.body;

        var users = userModel.updateUser(userId, updatedUser);

        res.json(users);


    }

    function removeUserById(req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUser(userId);
        res.json(users);

    }


};