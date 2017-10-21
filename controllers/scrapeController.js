//require dependencies
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
//grab an instance of express router
var router = express.Router();
var mongoose = require('mongoose');

//database config for mongoose and setting it to the var db
mongoose.connect('mongodb://localhost/newsScraperdb', {useMongoClient: true});
var db = mongoose.connection;

//import the models
var Article = require('./../models/ArticleModel.js');
var Note = require('./../models/NoteModel.js');

router.get('/', (req, res) => {
    Article.find({}, (err, doc) => {
        var hbsObject = {
            result: doc
        };
        res.render('index', hbsObject);
    });
});

//get request to scrape the nytimes website
router.get('/scrape', function(req, res) {
    //render the html from the site through request
    request('https://www.nytimes.com', function(error, resp, html) {
        if (error) {
            console.log(error);
        } else {
        //load the html into cheerio and save it into $
        }var $ = cheerio.load(html);
        //scrape every h2 w/ a class of story-heading
        $('h2.story-heading').each(function(i, element) {
            //initiate a var results set to an empty object
            var result = {};
            //add each h2's text and link as propeties of a result object with dot notation
            result.title = $(element).children('a').text();
            result.link = $(element).children('a').attr('href');
            result.summary = $(element).nextAll('.summary').text();

            //pass each result object into the Article model to construct Articles
            // console.log(result);
            var item = new Article(result);
            //save the item to the db
            item.save(function(err, doc) { 
                if (err) {
                    console.log(err);
                } 
                else {
                    console.log('Scrape complete');
                }
            });
        });
    });
    res.redirect('/');
});

router.get('/all', (req, res) => {
    Article.find({}, (err, doc) => {
        if (err){
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

router.get('/article/:id', (req, res) => {
    Article.find({_id: req.params.id}, (err, doc) => {
        if (err){
            console.log(err);
        } else {
            res.send(doc);
        }
    })
    .populate('note').exec((error, data) => {
        if (error){
            console.log(error);
        } else {
            res.send(data);
        }
    });
});



module.exports = router;