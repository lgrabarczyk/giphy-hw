// Initial array of actors
	var actors = ["Mark Hamill", "Jan Michael Vincent", "Peter Tork", "Michael Sarrazin", "Timothy Olyphant"];

// display displayArtistGif function re-renders the HTML to display the appropriate content
	function displayActorGif () {
		var actors = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actors + "&limit=10&api_key=RPxQK6gdY7RI33Zyt9U3jnUf9aZOocKu";
		console.log("Actor: " + actors);
		console.log("queryURL: " + queryURL);

// AJAX call for the specific button being clicked 
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

// div to hold all the gifs 
	dAll = $("<div>");

// For loop to append a button for each string in the array
	for (var i = 0; i < 10; i++) {

// div to hold the gif 
	dTag = $("<div class='gifs'>");

// Create div to hold and display the rating 
	dRating = $("<div>");
	dRating.append ("Rating:" + response.data[i].rating);

//Create div to hold and display the gif
	dGif = $("<div>");

	var image = $("<img class='gif' data-state='still'>");
		image.attr("src", response.data[i].images.fixed_height_still.url);
		image.attr("data-still", response.data[i].images.fixed_height_still.url);
		image.attr("data-animate", response.data[i].images.fixed_height.url)

	dGif.append(image)

			
//put the div dTag together
	dTag.append(dGif);
	dAll.append(dTag);
	dTag.append(dRating);


	}

		$("#gifDiv").html(dAll);

	}); // ends AJAX call

} // ends displayArtistGif function


//Function to render buttons
	function renderButtons() {

//Empties the div
	$("#buttons-view").empty();

//Loops through the array of actors
	for (var i = 0; i < actors.length; i++) {
		var a = $("<button class='actor'>");
		a.attr("data-name", actors[i]);
		a.text(actors[i]);
		$("#buttons-view").append(a);
	}

} //end of renderButtons function


//Function for add actor button
$("#add-actor").on("click", function(event) {

	event.preventDefault();
	var actor = $("#actor-input").val().trim();
	actors.push(actor);
	renderButtons();

}); // ends add actor button


//  click event listener 
$(document).on("click", ".actor", displayActorGif);


//animate on click
$(document).on("click", ".gif", function() {

	var state = $(this).attr("data-state");
	var animateUrl = $(this).attr("data-animate");
	var stillUrl = $(this).attr("data-still");

	if (state === "still") {
		$(this).attr("src", animateUrl);
		$(this).attr("data-state", "animate");
	}

	if (state === "animate") {
		$(this).attr("src", stillUrl);
		$(this).attr("data-state", "still")
	}

}); // ends animate on click


//renders buttons on load
renderButtons();