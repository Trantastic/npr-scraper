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
		let thisId = $(this).attr("data-id");

		$.ajax({
			method: "PUT",
			url: "/save/" + thisId
		}).then(function(data){

		});
	});
	
	// Adds comment to corresponding article and stores in DB
	let saveBtn;
	$(document).on("click", "#save-comment", function(){
		$.ajax({
			method: "POST",
			url: "/save/" + saveBtn,
			data: {
				body: $("#comment-box").val()
			}
		}).then(function(data){
			
		});
	});

	// Gets comments from specific article clicked
	$(document).on("click", "#comment-btn", function(){
		$("#comment-box").val("");
		$("#article-title").empty();
		
		let thisId = $(this).attr("data-id");

		$.ajax({
			method: "GET",
			url: "/save/" + thisId
		}).then(function(data){
			$("#article-title").text(data.title);
			$("textarea#comment-box").val(data.comment.body);
			
		});
		return saveBtn = thisId;
	});

	// Delete a saved article
	$(document).on("click", "#delete", function(){
		let thisId = $(this).attr("data-id");

		deleteArticle(thisId);
		// Refresh page when article is deleted
		location.reload();
	});

	function deleteArticle(thisId){
		$.ajax({
			method: "DELETE",
			url: "/delete/" + thisId
		});
	}

});