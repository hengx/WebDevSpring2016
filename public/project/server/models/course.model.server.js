module.exports = function(){
    var courses = [];
    var api = {
        findCourseByCourseId: findCourseByCourseId,
        findCoursesByCourseIds: findCoursesByCourseIds,
        createCourse: createCourse
    };
    return api;

    function findCoursesByCourseIds(courseIds){
        var courses = [];
        for (var id in courseIds){
            var course = findCourseByCourseId(courseIds[id]);
            if (course){
                courses.push({
                    _id: course._id,
                    title: course.title,
                    poster: course.poster,
                    courseId: course.courseId
                });
            }

        }
        return courses;
    }

    function createCourse(course){
        course = {
            _id: "ID_" + (new Date()).getTime(),
            courseId: course.courseId,
            poster: course.Poster,
            title: course.Title
        };
        courses.push(course);
        return course;
    }

    function findCourseByCourseId(courseId){
        for (var c in courses){
            if (courses[c].id === courseId){
                return courses[c];
            }
        }
        return null;
    }
};