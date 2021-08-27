const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nihongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const n5Schema = new Schema({
    title: String,
    author: String,
    description: String,
    timeCreated: { type:Date, 
                    default:  ()=>Date.now()},
    img: { type: String
        }
}, {
    collection: "n5"
});

const n5Model = mongoose.model('n5', n5Schema)
module.exports = n5Model