$(document).ready(function(){

	// Scrapes for articles when button is pressed
	$("#scrape").on("click", function(){
		$.get("/scrape", function(){
			location.reload();
		})
	});

	// Updates saved value to true in mongoDB when button is clicked
	$("#save").on("click", function(){
		console.log("save was clicked");

		const thisId = $(this).attr("data-id");

		$.ajax({
			method: "PUT",
			url: "/save/" + thisId
		}).then(function(data){
			console.log("THIS IS THE DATA ", data);
		});

		// When I wrote the ajax call below, it didnt work. Why?
		// $.put("/save/" + thisId, function(data){
		// 	console.log(data);
		// });
	});

});