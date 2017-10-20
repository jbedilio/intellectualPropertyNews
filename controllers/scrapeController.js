//require express
var express = require('express');
//grab an instance of express router
var router = express.Router();

//import the models
var Article = require('./../models/ArticleModel.js');
var Note = require('./../models/NoteModel.js');

module.exports = router;