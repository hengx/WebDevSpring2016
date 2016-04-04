module.exports = function (app, userModel) {
    'use strict';
    app.post("/api/assignment/user", register);//createUser
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredential);//find user by credential
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=:username", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", removeUserById);

    function register(req, res) {
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(function (user) {
                if (user) {
                    res.json(null);
                } else {
                    userModel.createUser(user)
                        .then(function (newU) {
                            res.json(newU);
                        });

                }
            });

        //var newUser = userModel.createUser(user);
        //req.session.currentUser = newUser;
        //res.json(newUser);
    }



    function getAllUsers(req, res) {
        if (req.query.username && req.query.password){
            findUserByCredential(req, res);
        } else if (req.query.username){
            findUserByUsername(req, res);
        }
        else {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
        }

    }

    function findUserByCredential(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        if (username != null && password != null) {
            var credential = {
                username: username,
                password: password
            };
            console.log(credential);
            userModel
                .findUserByCredential(credential)
                .then(function (user) {
                    res.json(user);
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

    function findUserByUsername(req, res){
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (user){
                res.json(user);
            })
    }


    function updateUser(req, res) {
        var userId = req.params.id;
        var updatedUser = req.body;

        userModel
            .updateUser(userId, updatedUser)
            .then(function (user) {
                res.json(user);
                //req.session.currentUser = user;
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

    //function loggedin(req, res) {
    //    res.json(req.session.currentUser);
    //}
    //
    //function logout(req, res) {
    //    req.session.destroy();
    //    res.send(200);
    //}
    //
    //function profile(req, res){
    //    var userId = req.params.userId;
    //    var user = userModel.findUserById(userId);
    //    res.json(user);
    //}

};