/**
 * Created by hengxu on 3/1/16.
 */
(function(){
    angular
        .module("MoocApp")
        .factory("CourseService", courseService);

    function courseService($http) {

        var api = {
            UserLikesCourse: UserLikesCourse,
            findUserLikes: findUserLikes
            //searchCourseByTitle: searchCourseByTitle,
            //findCourseById: findCourseById
        };
        return api;

        function findUserLikes(courseId){
            return $http.get("/api/project/course/"+courseId+"/user");
        }
        function UserLikesCourse(userId,course){
            return $http.post("/api/project/user"+userId+"/course/"+course.courseId, course);
        }

        //function searchCourseByTitle(name, callback) {
        //    $http.get("https://api.coursera.org/api/catalog.v1/courses?fields=smallIcon,shortDescription&q=search&query="+name)
        //
        //        .success(callback);
        //}
        //
        //function findCourseByCourseId(id, callback) {
        //    $http.get("https://api.coursera.org/api/catalog.v1/courses?fields=smallIcon,shortDescription&q=search&query="+id)
        //        .success(callback);
        //}
        //function searchCourseByTitle(title) {
        //    return $http.get("https://api.coursera.org/api/catalog.v1/courses?fields=smallIcon,shortDescription&q=search&query="+ title)
        //
        //}
        //
        //function findCourseById(id) {
        //    return $http.get("https://api.coursera.org/api/courses.v1?id="+id+"?includes=instructorIds,partnerIds&fields=instructorIds,partnerIds")
        //
        //}

        //search by category
        //https://api.coursera.org/api/catalog.v1/categories?id=1&fields=name,courses.fields(photo)&includes=courses

        //https://api.coursera.org/api/courses.v1?ids=v1-3,Gtv4Xb1-EeS-ViIACwYKVQ&includes=instructorIds,partnerIds&fields=instructorIds,partnerIds


    }
})();
