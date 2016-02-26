/**
 * Created by hengxu on 2/19/16.
 */
(function () {
    angular
        .module("MovieDBApp", []) //no dependencies
        .controller("MovieListController", MovieListController);

    function MovieListController($scope) {
        var movies = [
            {id: 123, title: "Avatar", year: 2007},
            {id: 234, title: "Star Wars", year: 1977}
        ];
        // console.log("Hello from MovieListController");
        $scope.movies = movies;

        //declare event handlers on top
        //event handlers declarations
        $scope.addMovie = addMovie;
        $scope.removeMovie = removeMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        //event handlers implementations
        function addMovie(movie) {
            console.log(movie);
            var newMovie = { //new instance is created
                id: movie.id,
                title: movie.title,
                year: movie.year
            };

            $scope.movie = {};//clear the movie
            $scope.movies.push(newMovie);
        }

        function removeMovie(movie) {//pass object around
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);

        }

        function selectMovie(movie){
            $scope.selectedMovieIndex = $scope.movies.indexOf(movie);
           // $scope.selectedMovie = movie; //keep track of the original movie so when update later, has the reference
            $scope.movie = {//copy of movie so they no longer bound, otherwise $scope.movie = movie
                id: movie.id,
                title: movie.title,
                year: movie.year

            }
        }

        function updateMovie(movie){
            $scope.movies[$scope.selectedMovieIndex] = {
                id: movie.id,
                title: movie.title,
                year: movie.year
            }

        }
    }
})();