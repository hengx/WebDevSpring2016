/**
 * Created by hengxu on 2/11/16.
 */
/**IEFFI design pattern*/
(function(){
    $(init);

    var $movieTitleTxt;//hold jQuery object when grab it from DOM
    var $searchMovieBtn;


    function init(){ //load
        //alert("Hello from jQuery");
        var $movieTitleTxt = $("#movieTitleTxt");
        var $searchMovieBtn = $("#searchMovieBtn");

        //invoke the button
        $searchMovieBtn.click(searchMovie);


    function searchMovie(){
        var movieTitle = $movieTitleTxt.val();//grab the value and use that to query my api
        alert("Search for " + movieTitle);
    }

})();