/**
 * Created by hengxu on 3/1/16.
 */

(function () {
    angular
        .module("MoocApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, CourseraService, $rootScope, $location, CourseService) {
        var vm = this;
        var courseId = $routeParams.id;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;


        function init() {
            CourseraService
                .findCourseByCourseId(courseId)
                .then(function (response) {
                    vm.data = response.data;

                });

            CourseService
                .findUserLikes(courseId)
                .then(function(response){
                    vm.course = response.data;
                });
        }

        init();

        function favorite(course){
            if(currentUser){
                CourseService
                    .setUserLikesCourse(currentUser._id, course);
            }else {
                $location.url("/login");
            }

        }
    }
})();

//function detailsController($scope, $routeParams, CourseService) {
//    $scope.id = $routeParams.id;
//    $scope.name = $routeParams.name;
//
//    CourseService.findCourseByCourseId(
//        $scope.id,
//        function(response) {
//            $scope.course = response;
//            console.log(response);
//        }
//    );
//CourseService.searchCourseByTitle(
//    $scope.name,
//    function(response) {
//        $scope.course = response;
//    }
//)

//
//    }
//})();