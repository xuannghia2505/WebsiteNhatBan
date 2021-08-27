const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nihongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const n4Schema = new Schema({
    title: String,
    author: String,
    description: String,
    timeCreated: { type:Date, 
                    default:  ()=>Date.now()},
    img: { type: String
        }
}, {
    collection: "n4"
});

const n4Model = mongoose.model('n4', n4Schema)
module.exports = n4Model;