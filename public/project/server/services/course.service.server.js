module.exports = function (app, courseModel, userModel) {
    'use strict';
    app.post("/api/project/user/:userId/course/:courseId", setUserLikesCourse);
    app.get("/api/project/course/:courseId/user", findUserLikes);

    //return the course and set the users who liked the course in course
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
                function (course) {
                    return userModel.userLikesCourse(userId, course);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            //add course to user courseIdsLikedByUser
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



};