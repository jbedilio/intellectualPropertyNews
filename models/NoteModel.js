//require mongoose & create Schema class with mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//make NoteSchema a Schema
var NoteSchema = new Schema({
    body: {
        type: String,
        lowercase: true,
        required: "please enter a note"
    },
    created: {
        type: Date,
        default: Date.now
    }
});
//setting the var Note to hold the mongoose model & schema
var Note = mongoose.model('Note', NoteSchema);
//exporting the var Note
module.exports = Note;