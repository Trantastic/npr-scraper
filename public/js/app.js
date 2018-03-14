$(document).ready(function(){

	$.get("/articles", function(data){
		console.log("data is: ", data);
	});

});