(function () {
    angular
        .module("MoocApp")
        .factory("MoocService", moocService);

    function moocService($http) {
        var api = {
            searchCourseByName: searchCourseByName,
            findCourseByCourseId: findCourseByCourseId

        };
        return api;

        function searchCourseByName(name) {
            //return $http.get("https://api.coursera.org/api/catalog.v1/courses?fields=smallIcon,shortDescription&q=search&query=" + name);
            return $http.get("https://api.coursera.org/api/catalog.v1/courses?fields=smallIcon,shortDescription&q=search&query=" + name);

        }

        function findCourseByCourseId(courseId){
            //console.log("courseId is");
            //console.log(courseId);
            //return $http.get("https://api.coursera.org/api/courses.v1/"+courseId+"?fields=description,photoUrl,instructorId,partnerId,primaryLanguages,startDate,workload");
            return $http.get("https://api.coursera.org/api/catalog.v1/courses?id="+courseId+"&fields=smallIcon,shortDescription");

        }
    }
})();