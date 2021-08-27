const User = require('../models/user');

module.exports = function (req, res, next) {
    try {
        const username = req.body.username;
            User.findOne({ username: username })
                .then(data => {
                    if (data) {
                        res.render("dangki", {data: {error: "Username is existed"}})
                    } else {
                        next()
                    }

                })
    } catch (e) {
        res.status(401).json({ status: "failed", message: e.message })
    }


}