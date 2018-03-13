// Requiring npms
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");

// Requiring everything in models folder
var db = require("./models");

var PORT = 8080;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newsScrape", {
  useMongoClient: true
});