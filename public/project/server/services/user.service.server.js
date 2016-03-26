module.exports = function (app, courseModel, userModel) {
    app.post("/api/project/login", login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/api/project/profile/:userId", profile);

    function profile(req, res) {
        var userId = req.params.userId;

        //use model to find user by id
        var user = userMode.findUserById(userId)
            .then(
                //return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                //send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    //    var user = userModel.findUserById(userId);
    //    var courseCourseraIds = user.likes;
    //    var courses = courseModel.findCoursesByCourseIds(courseCourseraIds);
    //    user.likesCourses = courses;
    //    res.json(user);
    //}

    function register(req, res) {
        var user = req.body;

        user = userModel.createUser(user)
            //handle model promise
            .then(
                //login user if promise resolved
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                //send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
        //user = userModel.createUser(user);
        //req.session.currentUser = user;
        //res.json(user);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);

        function loggedin(req, res) {
            res.json(req.session.currentUser);

        }

        function logout(req, res) {
            req.session.destroy();
            res.send(200);
        }
    }
};