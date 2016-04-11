module.exports = function (app, courseModel, userModel) {
    app.post("/api/project/user/:userId/course/:courseId", userLikesCourse);
    app.get("/api/project/course/:courseId/user", findUserLikes);

    function findUserLikes(req, res){
        var courseId = req.params.courseId;
        console.log(courseId);
        var course = courseModel.findCourseByCourseId(courseId);
        if (course){
            var userLikes = course.likes;
            console.log(userLikes);
            var users = userModel.findUsersByIds(userLikes);
            course.userLikes = users;
        }
        res.json(course);
    }


    function userLikesCourse(req, res) {
        var courseCoursera = req.body;
        var userId = req.params.userId;
        var courseId = req.params.courseId;
        var course = courseModel.findCourseByCourseId(courseId);

        if (!course) {
            course = courseModel.createCourse(courseCoursera);
        }
        if (!course.likes) {
            course.lies = [];
        }
        course.likes.push(userId);

        var user = userModel.findUserById(userId);
        if(!user.likes){
            user.likes = [];
        }
        user.likes.push(courseId);
        console.log(user);
        console.log(course);
        res.send(200);
    }

};
