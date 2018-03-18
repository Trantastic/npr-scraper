$(document).ready(function(){

	// Scrapes for articles when button is pressed
	$("#scrape").on("click", function(){
		$.ajax({
			method: "GET",
			url: "/scrape"
		}).then(function(){
			location.reload(true);
		});
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
			console.log("THIS IS THE PUT DATA ", data);
			
		});
	});

	// Gets comments from specific article clicked
	$(document).on("click", "#comment-btn", function(){
		$("#comment-box").val("");
		
		let thisId = $(this).attr("data-id");

		$.ajax({
			method: "GET",
			url: "/save/" + thisId
		}).then(function(data){
			console.log(data.comment.body);
			let userComment = data.comment.body;
			$("textarea#comment-box").val(userComment);
			
		});
	});

	// Deletes user comments from specific article
	$(document).on("click", "#delete-comment", function(event){
		event.preventDefault();
	});

	// Delete a saved article
	$(document).on("click", "#delete", function(){
		let thisId = $(this).attr("data-id");

		$.ajax({
			method: "DELETE",
			url: "/delete/" + thisId
		}).then(function(){
			
		});
	});

});