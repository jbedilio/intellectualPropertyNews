//require dependencies
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
//grab an instance of express router
var router = express.Router();
var mongoose = require('mongoose');

//import the models
var Article = require('./../models/ArticleModel.js');
var Note = require('./../models/NoteModel.js');

router.get('/', (req, res) => {
    Article.find({}, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                result: doc
            });
        }
    });
});

//get request to scrape the nytimes website
router.post('/article/scrape', function(req, res) {
    //render the html from the site through request
    request('https://www.nytimes.com', function(error, resp, html) {
        if (error) {
            console.log(error);
        } else {
        //load the html into cheerio and save it into $
        var $ = cheerio.load(html);
        }
        //scrape every h2 w/ a class of story-heading
        $('h2.story-heading').each(function(i, element) {
            //initiate a var results set to an empty object
            var result = {};
            //add each h2's text and link as propeties of a result object with dot notation
            result.title = $(this).children('a').text();
            result.link = $(this).children('a').attr('href');
            result.summary = $(this).nextAll('.summary').text();
            //pass each result object into the Article model to construct Articles
            // console.log(result);
            var item = new Article(result);
            //save the item to the db
            item.save({}, function(err, doc) { 
                if (err) {
                    console.log(err);
                } 
                else {
                    console.log('Scrape complete');
                }
            });
        });
        res.redirect('/');
    });
});

router.post('/article/delete/unsaved', (req, res) => {
    Article.remove({keep: false}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
        res.redirect('/');
    });   
});

router.post('/article/delete/all', (req, res) => {
    mongoose.connection.db.dropCollection('articles', function (err, result) {
        if (err) {
            console.log('err: ', err);
        } else {
            console.log(result);
        }
    });
    mongoose.connection.db.dropCollection('notes', function (err, result) {
        if (err) {
            console.log('err: ', err);
        } else {
            console.log(result);
        }
        res.redirect('/');
    });
});

router.get('/api/all', (req, res) => {
    Article.find({}, (err, doc) => {
        if (err){
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

router.get('/api/saved', (req, res) => {
    Article.find({keep: true}, (err, doc) => {
        if (err){
            console.log(err);
        } else {
            res.send(doc);
        }
    })
})

router.post('/article/note/:id', (req, res) => {
    var entry = new Note(req.body);
    entry.save(function (err, doc) {
        if (err) {
            res.send(err);
        } else {
            Article.findOneAndUpdate({_id: req.params.id}, {$push: {'note': doc._id}}, {new: true}, function (err, newdoc) {
                if (err) {
                    console.log('err: ', err);
                } else {
                    res.redirect('/');
                }
            });
        }
    });
});

router.get('/article/populate/:id', (req, res) => {
    Article.find({_id: req.params.id}).populate('note').exec(function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            res.send(doc);
        }
    });
});

router.post('/article/save/:id', (req, res) => {
    Article.findOneAndUpdate({_id: req.params.id}, {$set: {keep: true}}, function(err, data){
        if (err) {
            console.log('err: ', err);
        } else {
            res.redirect('/');
        } 
    });
});

router.post('/article/delete/:id', (req, res) => {
    Article.remove({_id: req.params.id}, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log('deleted: ', req.params.id);
        }
    });
    res.redirect('/');
});

module.exports = router;