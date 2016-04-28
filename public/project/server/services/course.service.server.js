module.exports = function (app, courseModel, userModel) {
    'use strict';
    app.post("/api/project/user/:userId/course/:courseId", setUserLikesCourse);
    app.get("/api/project/course/:courseId/user", findUserLikes);

    function findUserLikes(req, res) {
        var courseId = req.params.courseId;
        var course = null;
        courseModel
            .findCourseByCourseId(courseId)
            .then(
                function (doc) {
                    course = doc;
                    if (doc) {
                        return userModel.findUsersByIds(course.userIdsLikedCourse);
                    } else {
                        res.json({});
                    }

                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    course.userListsLikedCourse = users;
                    res.json(course);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }



        function setUserLikesCourse(req, res) {
        var courseMooc = req.body;
        var userId = req.params.userId;
        var courseId = req.params.courseId;
        var course;

        courseModel
            .setUserLikesCourse(userId, courseMooc)
        //add user to course coursesIdLiked
            .then(
                function(course){
                    return userModel.userLikesCourse(userId, course);
                },
                function (err){
                    res.status(400).send(err);
                }
            )
            //add course to user courseIdsLikedByUser
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
        //if (!course) {
        //    //course = courseModel.createCourse(courseMooc);
        //    courseModel.createCourse(courseMooc)
        //        .then(
        //            function (course) {
        //                if (!course.coursesIdLiked) {
        //                    course.coursesIdLiked = [];
        //                }
        //                course.coursesIdLiked.push(userId);
        //
        //                var user = userModel.findUserById(userId);
        //                if (!user.coursesIdLiked) {
        //                    user.coursesIdLiked = [];
        //                }
        //                user.coursesIdLiked.push(courseId);
        //                console.log(user);
        //                console.log(course);
        //                res.send(200);
        //
        //            },
        //            function (err) {
        //                res.status(400).send(err);
        //            }
        //        );
        //}
        //res.send(200);
    }





        //var course = courseModel.findCourseByCourseId(courseId);
        //if (course) {
        //    var userListsLikedCourse = course.coursesIdLiked;
        //    console.log(userListsLikedCourse);
        //    var users = userModel.findUsersByIds(userListsLikedCourse);
        //    course.userListsLikedCourse = users;
        //}
        //
        //
        ////res.send(users);
        ////console.log(id);
        ////res.send(200);
        //
        //
        //res.json(course);

};