/**
 * Created by hengxu on 2/11/16.
 */
/** IEFFI design pattern*/

(function(){
    $(init);

    var $movieTitleTxt;//hold jQuery object when grab it from DOM
    var $searchMovieBtn;
    var $tbody;
    var searchURL = "http://www.omdbapi.com/?s=TITLE&page=PAGE";
    var detailsURL = "http://www.omdbapi.com/?i=IMDBID";
    var $detailsPoster;
    var $director;
    var $detailsPlot;
    var $detailsActors;
    var $detailsTitle;


    function init(){
        $movieTitleTxt = $("#movieTitleTxt");
        $searchMovieBtn = $("#searchMovieBtn");
        $tbody = $("#searchResults tbody"); //css rule, grab the table body

        $detailsPoster = $("#detailsPoster");
        $director = $("#director");
        $detailsPlot = $("#detailsPlot");
        $detailsActors = $("#detailsActors");
        $detailsTitle = $("#detailsTitle");



        //invoke the button
        $searchMovieBtn.click(searchMovie);
    }


    function searchMovie() {
        var movieTitle = $movieTitleTxt.val();
        /**grab the value and use that to query my api**/

        var url = searchURL
            .replace("TITLE", movieTitle)
            .replace("PAGE", 1);

        //alert("URL " + url);
        $.ajax({
            url: url,
            success: renderMovieList //pass the resul tof the response
        });//provide a json object, configure the function

    }

    function renderMovieList(response) {
        $tbody.empty();//empty the content of tbody, so the older content would not stay
        //alert("Movie List");
        console.log(response);
        var totalResponse = response.totalResults;
        var movies = response.Search;//from inspect element, network

        //display the result
        for (var m = 0; m < movies.length; m++){
            var movie = movies[m];
            //console.log(movie);

            var title = movie.Title;
            var imdbID = movie.imdbID;
            var poster = movie.Poster;

            console.log(title);


            //display the results dynamically
            var $tr = $("<tr>");

            //display the poster image
            //store id in image, retrieve it when click the image
            var $img = $("<img>")
                .attr("src", poster)
                .addClass("poster")
                .attr("id", imdbID) //set id to imdbID
                .click(searchMovieDetails);

//table data
            var $td = $("<td>");
            $td.append($img); //url,txt
            $tr.append($td);

            $td = $("<td>")
                .append(title);
            $tr.append($td);

            $td = $("<td>").append(imdbID);
            $tr.append($td);

            $tbody.append($tr);

        }
    }
//when inspect source, id is there
    //display id when click the poster, then by using the id, query
    function searchMovieDetails(event){//event handler
        //alert("searchMovieDetails");
        console.log(event);

        var img = $(event.currentTarget);//raw DOM element,  wrap in jQuery
        var imdbid = img.attr("id");
        alert("IMDB ID " + imdbid);

        var url = detailsURL.replace("IMDBID", imdbid);
        $.ajax({
            url: url,
            success: renderMovieDetails
        });
    }

    function renderMovieDetails(movie){
        console.log(movie)

        var actors = movie.Actors;
        var director = movie.Director;
        var plot = movie.Plot;
        var poster = movie.Poster;
        var title = movie.Title;

        $detailsPoster.attr("src", poster);
        $detailsPlot.html(plot);
        $director.html(director);
        $detailsTitle.html(title);

        var actorArray = actors.split(",");//DELIMITER
        //empty it first
        $detailsActors.empty();

        //a is an index here, not real value
        for (var a in actorArray) {
            var actor = actorArray[a];

            var $li = $("<li>")
                .append(actor)
                .appendTo($detailsActors);
        }




    }


})();
