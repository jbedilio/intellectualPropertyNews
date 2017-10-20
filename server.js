//requiring dependencies
var express = require('express');
var bp = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

//setting Mongoose to leverage built in JS ES6 Promises
mongoose.Promise = Promise;

//require the models
var Article = require('./models/ArticleModel.js');
var Note = require('./models/NoteModel.js');

//grabbing an instance of express
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//setting the instance of express to use morgan & body-parser
app.use(logger('dev'));
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

//database config for mongoose and setting it to the var db
mongoose.connect('mongodb://localhost/newsScraperdb');
var db = mongoose.connection;

//set handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/scrapeController.js');

app.use('/', routes);

app.listen(3000, () => {
    console.log('In the hizzy!');
});




