//require mongoose & create Schema class with mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//make ArticleSchema a Schema
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
//setting the var Article to hold the mongoose model & schema
var Article = mongoose.model('Article', ArticleSchema);
//exporting the var Article
module.exports = Article;