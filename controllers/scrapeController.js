//require express
var express = require('express');
//grab an instance of express router
var router = express.Router();

//import the models
var Article = require('./../models/ArticleModel.js');
var Note = require('./../models/NoteModel.js');

router.get('/', (req, res) => {
    res.send('Hello Fuckers!');
});

//get request to scrape the nytimes website
router.get('/scrape', (req, res) => {
    //render the html from the site through request
    request('https://www.nytimes.com', (error, res, html) => {
        //load the html into cheerio and save it into $
        var $ = cheerio.load(html);
        //scrape every h2 w/ a class of story-heading
        $('h2.story-heading').each((i, element) => {
            //initiate a var results set to an empty object
            var result = {};
            //add each h2's text and link as propeties of a result object with dot notation
            result.title = $(this).children('a').text();
            result.link = $(this).children('a').attr('href');

            //pass each result object into the Article model to construct Articles
            var item = new Article(result);

            //save the item to the db
            item.save((error, doc) => {
                if (error) {
                    throw error;
                } else {
                    res.send(doc);
                }
            });
        });
    });
});

router.get('/all', (req, res) => {
    Article.find({}, (error, doc) => {
        if (error){
            throw error;
        } else {
            res.send(doc);
        }
    });
});

router.get('/article/:id', (req, res) => {
    Article.find({_id: req.params.id}, (error, doc) => {
        if (error){
            throw error;
        } else {
            res.send(doc);
        }
    })
    .populate('note').exec((error, data) => {
        if (error){
            throw error;
        } else {
            res.send(data);
        }
    });
});



module.exports = router;