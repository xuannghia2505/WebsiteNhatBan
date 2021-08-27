const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nihongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const hiraSchema = new Schema({
    katakana: String,
    romaji: String,
    img:  String
        
}, {
    collection: "katakana"
});

const hiraModel = mongoose.model('katakana', hiraSchema)
module.exports = hiraModel;