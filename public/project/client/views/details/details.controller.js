(function(){
    angular
        .module("MoocApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, MoocService, $rootScope,$location, CourseService) {
        var vm = this;
        var courseId = $routeParams.courseId;
        vm.favorite = favorite;
        var currentUser = $rootScope.currentUser;
        console.log(courseId);

        function init() {
            MoocService
                .findCourseByCourseId(courseId)
                .then(function(response){
                    vm.data = response.data;
                    console.log("should return course information");
                    console.log(response.data);
                });
            CourseService
                .findUserLikes(courseId)
                .then(function(response){
                    vm.course = response.data;
                    console.log("detail controller, see");
                    console.log(response.data);
                });
        }
        init();


        function favorite(course){
            if (currentUser){
                vm.course.likes = [];
                vm.course.likes.push(currentUser._id);
                CourseService
                    .userLikesCourse(currentUser._id, course);
            } else {
                $location.url("/login");
            }

        }
    }
})();