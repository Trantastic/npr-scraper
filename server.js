// Requiring npms
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");

// Requiring everything in models folder
var db = require("./models");

var PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newsScrape", 
	{useMongoClient: true});

var mainRoutes = require("./routes/main-routes.js")(app);

// Route to display all articles from db
app.get("/", function(req, res){
	db.Article.find({})
		.then(function(dbArticle){
			res.render("index", {articles: dbArticle});
		})
		.catch(function(error){
			res.json(error);
		});
});

// Route to scrape articles 
app.get("/scrape", function(req, res){
	request("https://www.npr.org/sections/world/", function(error, response, html){
		var $ = cheerio.load(html);

		$("article.item").each(function(i, element){

			var title = $(element).find("h2.title").find("a").text();
			var link = $(element).find("h2.title").find("a").attr("href");
			var summary = $(element).find("p.teaser").find("a").text();
			// Prevents articles with null titles and links from being in db
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

// Route to save articles
app.put("/save/:id", function(req, res){
	db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
		.then(function(){
			console.log("Article saved!");
		});
});

// Points to saved-articles handlebar page, displays only saved articles
app.get("/saved", function(req, res){
	db.Article.find({ saved: true })
		.then(function(savedArticles){
			res.render("saved-articles", {savedArticles: savedArticles});
		})
		.catch(function(error){
			res.json(error);
		});
});

// Grabbing a specific article with its comments
app.get("/save/:id", function(req, res){
	db.Article.findOne({ _id: req.params.id })
	.populate("comment")
	.then(function(dbArticle){
		res.render("partials/comments/comments-block", { comment: dbArticle.comment });
	})
	.catch(function(error){
		res.json(error);
	});
});

// Saves user's comments and updates article's associated note
app.post("/save/:id", function(req, res){

	console.log("this is req.body ", req.body);

	db.Comment.create(req.body)
		.then(function(dbComment){
			console.log(dbComment);
			return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
		})
		.then(function(dbArticle){
			res.json(dbArticle);
		})
		.catch(function(error){
			res.json(error);
		});
});

// Delete a saved article
app.delete("/delete/:id", function(req, res){
	db.Article.deleteOne({ _id: req.params.id })
		.then(function(){
			console.log("Saved article deleted");
		});
});

app.listen(8080, function() {
  console.log("App running on port 8080!");
});

















