# npr-scraper

This is an app that scrapes news articles from NPR World News. You can save articles you want to read later and add comments to them. Whenever the user is on the home page, the app will automatically scrape for new articles. Users may also manually scrape for new articles by clicked the "Scrape Articles" button on the navbar.

## Demo ##

[Clicked here for deployed app on Heroku](https://npr-scraper2018.herokuapp.com/)

Users can save articles they want to read later and delete them:  
![](https://github.com/Trantastic/npr-scrapper/blob/master/public/img/gif1.gif)

Users can add and update their own comments to their saved articles:  
![](https://github.com/Trantastic/npr-scrapper/blob/master/public/img/gif3.gif)

Clicking on an article's headline will open another tab to article on npr's website:  
![](https://github.com/Trantastic/npr-scrapper/blob/master/public/img/gif2.gif)

## Getting Started ##

1. To run this on your own computer, clone or fork this repo.  
2. In your terminal navigate to the folder of your clone or fork and make sure you are in the folder where server.js is. If you type `ls` in your terminal and see server.js, you're good to go. 
3. Install the node packages by typing `npm install` in your terminal.
4. After your node packages have been installed, type `node server.js` to run the server.
5. In your browser type in localhost:8080 to run the app in your browser.

## Build With ##

* JavaScript
* jQuery
* Node.js
* [Handlebars.js](https://handlebarsjs.com/)
* MongoDB
* [Mongoose](http://mongoosejs.com/)
* [cheerio](https://cheerio.js.org/)
