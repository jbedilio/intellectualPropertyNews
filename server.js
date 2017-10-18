//requiring dependencies
var express = require('express');
var bp = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

//setting a port
var PORT = process.env.PORT || 3000;


//grabbing an instance of express
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

//set handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




