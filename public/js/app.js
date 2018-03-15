$(document).ready(function(){

	// Scrapes for articles when button is pressed
	$("#scrape").on("click", function(){
		$.get("/scrape", function(){
			location.reload();
		})
	});

	// Updates saved value to true in mongoDB when button is clicked
	$(document).on("click", "#save", function(){
		console.log("save was clicked");

		let thisId = $(this).attr("data-id");

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

	// Adds comment to corresponding article and stores in DB
	$(document).on("click", "#save-comment", function(){
		let thisId = $(this).attr("data-id");

		$.ajax({
			method: "POST",
			url: "/save/" + thisId,
			data: {
				body: $("#comment-box").val()
			}
		}).then(function(data){
			$("#comment-box").val("");
		});
	});

	$(document).on("click", "#comment-btn", function(){
		let thisId = $(this).attr("data-id");

		$.ajax({
			method: "GET",
			url: "/save/" + thisId
		}).then(function(data){
			console.log("Comments Displayed ", data);
		});
	});

	// Delete a saved article
	$(document).on("click", "#delete", function(){
		let thisId = $(this).attr("data-id");

		$.ajax({
			method: "DELETE",
			url: "/delete/" + thisId
		}).then(function(data){
			location.reload();
		});
	});

});