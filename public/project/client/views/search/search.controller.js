/**
 * Created by hengxu on 3/1/16.
 */
(function(){
    angular
        .module("MoocApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, CourseService) {
        var vm = this;

        vm.search = search;

        function init(){

        }
        init();

        function search(course){
            CourseService
                .searchCourseByTitle(course.title)
                .then(function(response){
                    vm.data = response.data;
                });
        }
        //$scope.search = search;
        //$scope.name = $routeParams.name;
        //
        ////if(!$scope.title) {
        ////    $scope.title = "Star Wars";
        ////}
        //
        //if($scope.name) {
        //    search($scope.name);
        //}
        //
        //function search(name) {
        //    $location.url("/search/"+$scope.name);
        //    console.log(name);
        //    CourseService.searchCourseByTitle(
        //        name,
        //        function(response){
        //            console.log(response);
        //            $scope.data = response;
        //        });
        //}
    }
})();
