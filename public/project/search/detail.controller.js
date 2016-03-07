/**
 * Created by hengxu on 3/1/16.
 */

(function(){
    angular
        .module("MoocApp")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams, CourseService) {
        $scope.id = $routeParams.id;
        $scope.name = $routeParams.name;

        CourseService.findCourseById(
            $scope.id,
            function(response) {
                $scope.course = response;
                console.log(response);
            }
        );
        //CourseService.findCourseByName(
        //    $scope.name,
        //    function(response) {
        //        $scope.course = response;
        //    }
        //)


    }
})();