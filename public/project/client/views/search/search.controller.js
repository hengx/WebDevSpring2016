(function (){
    angular
        .module("MoocApp")
        .controller("SearchController", searchController);

    function searchController(MoocService){
        var vm = this;

        vm.search = search;
        vm.message = null;

        function init(){

        }
        init();

        function search(course){
            //console.log("course name");
            //console.log(course);

            MoocService
                .searchCourseByName(course.name)
                .then(success, failure);

            function success(response){
                if (response.data){
                    vm.data = response.data;
                    //console.log("search result");
                    //console.log(response.data);
                }

            }
            function failure(response){
                vm.message = "No matching records found, please try again";
                //console.log("Search Failed");
            }


        }
    }
})();