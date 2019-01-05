
$(document).ready(function () {
    var actions = ["Mickey Mouse", "Donald Duck", "Dumbo", "Mary Poppins"];

    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < actions.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary", "");
            gifButton.attr("data-name", actions[i]);
            gifButton.text(actions[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new action button
    function addNewButton() {
        $("#addGif").on("click", function () {
            var action = $("#person-input").val().trim();
            if (action == "") {
                return false; // added to prevent blank button
            }
            actions.push(action);

            displayGifButtons();
            return false;
        });
    }

    // Function that displays all of the gifs
    function displayGifs() {
        var person = $(this).attr("data-name");
        var queryURL = ("http://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=K1aQwAwTsa73ZG5XxEC2cIqbI4kOsKcI&limit=10");
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
                console.log(response);
                
                var results = response.data; 
                if (results == "") {
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    //div for the gifs to go inside
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");

                    // pulling rating of gif
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);

                    // pulling gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);

                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);

                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);

                    gifImage.attr("data-state", "still");

                    gifImage.addClass("image");
                    gifDiv.append(gifImage);

                    $("#gifsView").prepend(gifDiv);
                }}
            });
    }
    displayGifButtons();
    addNewButton();

    // Document Event Listeners
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});