var q = require("q");

module.exports = function(db, mongoose){
    // load course schema from course model
    var CourseSchema = require("./course.schema.server.js")(mongoose);
    // create movie from schema
    var Course = mongoose.model("Course", CourseSchema);
    var courses = [];

    var api = {
        findCourseByCourseId: findCourseByCourseId,
        findCoursesByCourseIds: findCoursesByCourseIds,
        createCourse: createCourse,
        setUserLikesCourse: setUserLikesCourse
    };

    return api;


    function findCourseByCourseId(courseId){

        var deferred = q.defer();
        Course.findOne({courseId: courseId}, function(err, doc){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findCoursesByCourseIds(courseIds){

        var deferred = q.defer();
        //find all course whose courseIds are in CourseIds array
        Course.find({
            courseId: {$in: courseIds}
        }, function (err, courses){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(courses);
            }
        });
        return deferred.promise;



    }
    function createCourse(course){
        var course = new Course({
            courseId: course.courseId,
            name: course.name,
            smallIcon: course.smallIcon,
            shortDescription: course.shortDescription,
            userIdsLikedCourse: []

        });
        var deferred = q.defer();

        // save course to database
        course.save(function(err, doc){
            if (err){
                // reject promise if error
                deferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });

        //courses.push(course);
        //return course;
        return deferred.promise;
    }


    function setUserLikesCourse(userId, course){
        var deferred = q.defer();
        // find the course by course ID
        Course.findOne({courseId: course.id},
        function (err, doc){
            // reject promise if error
            if (err){
                deferred.reject(err);
            }
            // if there's a course
            if (doc){
                // add user to userIdsLikedCourse
                doc.userIdsLikedCourse.push(userId);
                // save changes
                doc.save(function(err, doc){
                    if (err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            } else {
                // if there's no course
                // create a new instance
                course = new Course({
                    courseId: course.id,
                    name: course.name,
                    smallIcon: course.smallIcon,
                    shortDescription: course.shortDescription,
                    userIdsLikedCourse: []
                });
                // add user to userIdsLikedCourse
                course.userIdsLikedCourse.push(userId);
                course.save(function(err, doc){
                    if (err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }


};