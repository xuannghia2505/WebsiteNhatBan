const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
mongoose.connect('mongodb://localhost/nihongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: String,
    username: String,
    password: String,
    gender: String,
    img: String
}, {
    collection: "user"
});

userSchema.pre('save', function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err) return next(err);
        this.password = passwordHash;
        next();
    })
})

userSchema.methods.verifyPassword = function (newPassword, cb) {
    bcrypt.compare(newPassword, this.password, (err, isMatch) => {
        console.log(isMatch)
        if (err) return cb(err);        
        else cb(null, isMatch);
        // else {
        //     if (!isMatch) return cb(null, isMatch);
        //     return cb(null, this);
        // }
    })
}

const userModel = mongoose.model('user', userSchema)
module.exports = userModel