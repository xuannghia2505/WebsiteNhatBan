const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nihongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const hiraSchema = new Schema({
    hiragana: String,
    romaji: String,
    img:  String
        
}, {
    collection: "hiragana"
});

const hiraModel = mongoose.model('hiragana', hiraSchema)
module.exports = hiraModel;