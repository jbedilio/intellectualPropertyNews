//require mongoose & create Schema class with mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//make ArticleSchema a Schema
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    note: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
});
//setting the var Article to hold the mongoose model & schema
var Article = mongoose.model('Article', ArticleSchema);
//exporting the var Article
module.exports = Article;