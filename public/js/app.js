$(document).ready(function(){

	// $.get("/", function(data){
	// });

	$("#scrape").on("click", function(){
		$.get("/scrape", function(){
			location.reload();
		})
	});

});