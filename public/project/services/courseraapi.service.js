/**
 * Created by hengxu on 3/1/16.
 */
(function(){
    angular
        .module("MoocApp")
        .factory("CourseService", CourseService);

    function CourseService($http) {

        var api = {
            findCourseByName: findCourseByName,
            findCourseById: findCourseById
        };
        return api;

        //function findCourseByName(name, callback) {
        //    $http.get("https://api.coursera.org/api/catalog.v1/courses?fields=smallIcon,shortDescription&q=search&query="+name)
        //
        //        .success(callback);
        //}
        //
        //function findCourseById(id, callback) {
        //    $http.get("https://api.coursera.org/api/catalog.v1/courses?fields=smallIcon,shortDescription&q=search&query="+id)
        //        .success(callback);
        //}
        function findCourseByName(name, callback) {
            $http.get("https://api.coursera.org/api/catalog.v1/courses?fields=smallIcon,shortDescription&q=search&query="+name)

                .success(callback);
        }

        function findCourseById(id, callback) {
            $http.get("https://api.coursera.org/api/courses.v1?id="+id+"?includes=instructorIds,partnerIds&fields=instructorIds,partnerIds")
                .success(callback);
        }

        //search by category
        //https://api.coursera.org/api/catalog.v1/categories?id=1&fields=name,courses.fields(photo)&includes=courses

        //https://api.coursera.org/api/courses.v1?ids=v1-3,Gtv4Xb1-EeS-ViIACwYKVQ&includes=instructorIds,partnerIds&fields=instructorIds,partnerIds


    }
})();
