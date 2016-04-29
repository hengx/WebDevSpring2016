(function(){
    angular
        .module("MoocApp")
        .factory("CourseService", courseService);

    function courseService($http){
        var api = {
            userLikesCourse: userLikesCourse,
            findUserLikes: findUserLikes
        };
        return api;


        function userLikesCourse(userId, course){
            //console.log("print userLikesCourse in course service client, see id or courseId");
            //console.log(course);
            return $http.post("/api/project/user/"+userId+"/course/"+course.id, course);
        }

        function findUserLikes(courseId){
            return $http.get("/api/project/course/"+courseId+"/user");
        }
    }
})();