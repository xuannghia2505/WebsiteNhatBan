const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../middlewares/passport')
const jwt = require('jsonwebtoken');
const existUser = require('../middlewares/existUser')
const Blog = require('../models/blog');
const Hira = require('../models/hiragana');
const Kata = require('../models/katakana');

const N5 = require('../models/n5');
const N4 = require('../models/n4');
// const sessionMiddleware = require('../middlewares/sessionMiddleware')
require('dotenv').config();
const path = require('path')
const userControllers = require('../controllers/userControllers');
const privateKey = process.env.APP_PRIVATE_KEY;
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/imgs/upload')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
})

//login
router.post('/dangnhap', (req, res, next) => {
    const user = req.body;

    if (user.username.trim().length == 0) {
        res.render("dangnhap", { data: { error: "Username is required" } })
    }
    else if (user.password.trim().length == 0) {
        res.render("dangnhap", { data: { error: "Password is not matched" } })
    }
    else {
        req.session.user = user.username;
        next();
    }

}, passport.authenticate('local', { failureRedirect: '/dangnhap' }), userControllers.login);
router.post('/dangki', upload.single("image"), (req, res, next) => {
    const user = req.body;
    if (user.fullname.trim().length == 0) {
        res.render("dangki", { data: { error: "Fullname is required" } })
    }
    else if (user.fullname.length > 50) {
        res.render("dangki", { data: { error: "Fullname too long" } })
    }
    else if (user.username.length > 30) {
        res.render("dangki", { data: { error: "Username too long" } })
    }
    else if (user.username.trim().length == 0) {
        res.render("dangki", { data: { error: "Username is required" } })
    }
    else if (user.password != user.cfpassword || user.password.trim().length == 0 || user.password.length < 3) {
        res.render("dangki", { data: { error: "Password is not matched" } })
    }
    else
        next();
}, existUser, userControllers.register);

router.get('/', (req, res, next) => {
    if (req.session.user) {
        res.render("trangchu", {
            data: {
                active: 1,
                username: req.session.user
            }
        })
    }
    else {
        res.render("trangchu", {
            data: {
                active: 1
            }
        })
    }

})

router.get('/vanhoa', (req, res, next) => {
    if (req.session.user) {
        res.render("vanhoa", {
            data: {
                active: 2,
                username: req.session.user
            }
        })
    }
    else {
        res.render("vanhoa", {
            data: {
                active: 2
            }
        })
    }
})

router.get('/tiengnhat', async (req, res, next) => {
        try {
            let hiragana = await Hira.find({});
            let katakana = await Kata.find({});
            let n5 = await N5.find({});
            let n4 = await N4.find({});
            if (req.session.user) {
            res.render("tiengnhat", {
                data: {
                    hiragana: hiragana,
                    katakana: katakana,
                    n5: n5,
                    n4: n4,
                    active: 3,
                    username: req.session.user
                }
            })
        }
        else {
            res.render("tiengnhat", {
                data: {
                    hiragana: hiragana,
                    katakana: katakana,
                    n5: n5,
                    n4: n4,
                    active: 3
                }
            })
        }
            
        } catch (error) {
        res.json(error)
    }
    
})

router.get('/tintuc', (req, res, next) => {
    if (req.session.user) {
        res.render("tintuc", {
            data: {
                active: 4,
                username: req.session.user
            }
        })
    }
    else {
        res.render("tintuc", {
            data: {
                active: 4
            }
        })
    }
})

router.get('/dangnhap', (req, res, next) => {
    res.render("dangnhap", { data: {} })
})

router.get('/dangki', (req, res, next) => {
    res.render("dangki", { data: {} })
})
//showbaiviet
router.get('/thembaiviet', (req, res, next) => {
    const blogs = [{
        title: 'The information we do not need',
        snippet: 'You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly',
        author: 'Somtea Codes',
        createdAt: new Date,
        img: '/imgs/dangki/canhkyoto.jpg'

    },
    {
        title: 'The information we do not need',
        snippet: 'You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly',
        author: 'Somtea Codes',
        createdAt: new Date,
        img: 'placeholder.jpg'
    },
    {
        title: 'The information we do not need',
        snippet: 'You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly',
        author: 'Somtea Codes',
        createdAt: new Date,
        img: 'placeholder.jpg'
    },
    {
        title: 'The information we do not need',
        snippet: 'You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly',
        author: 'Somtea Codes',
        createdAt: new Date,
        img: 'placeholder.jpg'
    },
    {
        title: 'The information we do not need',
        snippet: 'You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly',
        author: 'Somtea Codes',
        createdAt: new Date,
        img: 'placeholder.jpg'
    }


    ]

    res.render("thembaiviet", { blog: blogs })
})
router.get('/thembaiviet/news', (req, res, next) => {
    res.render("news.ejs", { data: {} });
})
router.post("/thembaiviet/news", async (req, res, next) => {
    const blogs = req.body;
    if (blogs.title.trim().length == 0) {
        res.render("news", { data: { alert: "blog is required" } })
    }
    else if (blogs.author.trim().length == 0) {
        res.render("news", { data: { alert: "author is required" } })
    }
    else if (blogs.description.trim().length == 0) {
        res.render("news", { data: { alert: "description is required" } })
    }
    else {
        let blog = new Blog({
            title: blogs.title,
            author: blogs.author,
            description: blogs.description,
        });
        try {
            blog = await blog.save();
            res.redirect('/thembaiviet/news')

        } catch (error) {
            console.log(error)
        }
    }
})
router.post('/postChucaihira', (req, res, next)=>{
    var hiragana = req.body.hiragana;
    var romaji = req.body.romaji;
    var image = req.body.image;
    var newChucai = ({
        hiragana : hiragana,
        romaji : romaji,
        img: image
    })
    let newChu = new Hira(newChucai);
        newChu.save();
        res.json("success")
})
router.post('/postChucaikata', (req, res, next)=>{
    var katakana = req.body.katakana;
    var romaji = req.body.romaji;
    var image = req.body.image;
    var newChucai = ({
        katakana : katakana,
        romaji : romaji,
        img: image
    })
    let newChu = new Kata(newChucai);
        newChu.save();
        res.json("success")
})
router.get('/logout', (req, res, next) => {

    // res.header('Cache-Control','no-cache');
    req.session.destroy();
    res.redirect('/')
}
)
module.exports = router;