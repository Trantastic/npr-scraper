// Requiring npms
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");

// Requiring everything in models folder
var db = require("./models");

var PORT = 8080;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newsScrape"
// 	, {
//   useMongoClient: true
// }
);

app.get("/scrape", function(req, res){
	request("https://www.npr.org/sections/world/", function(error, response, html){
		var $ = cheerio.load(html);

		$("article.item").each(function(i, element){

			var title = $(element).find("h2.title").find("a").text();
			var link = $(element).find("h2.title").find("a").attr("href");
			var summary = $(element).find("p.teaser").find("a").text();

			if(title && link){
				var result = {};

				result.title = title;
				result.link = link;
				result.summary = summary;

				db.Article.create(result)
					.then(function(dbArticle){
						console.log(dbArticle);
					})
					.catch(function(error){
						return res.json(error);
					});
			}
		});
	});
});

app.listen(8080, function() {
  console.log("App running on port 8080!");
});