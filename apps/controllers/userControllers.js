require('dotenv').config();
const userServices = require('../services/userServices');
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const privateKey = process.env.APP_PRIVATE_KEY;

module.exports = {
    login: function (req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        userServices.login(username, password)
            .then(data => {
                const authToken = jwt.sign({ data }, privateKey);
                res.set('Token', authToken);
                res.redirect('/')
            //     res.render("trangchu",{data: {
            //     ketqua: "success", 
            //     active: 1,
            //     username: username
            // }})
            })
            .catch(error => next(error))
    },
    register: function (req, res, next) {
        let body = new User({
            fullname: req.body.fullname,
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
            img: req.file.filename
        })
        // console.log(req.body)
        userServices.register(body)
            // .then(data => res.send({ status: "success", data }))
            .then(data => res.redirect('/dangnhap'))
            .catch(error => next(error));

    }
}