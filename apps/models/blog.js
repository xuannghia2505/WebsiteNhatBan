const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nihongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    author: String,
    description: String,
    timeCreated: { type:Date, 
                    default:  ()=>Date.now()},
    img: { type: String
        }
}, {
    collection: "blog"
});

const blogModel = mongoose.model('blog', blogSchema)
module.exports = blogModel