const express = require('express')
const app = express()
// const path = require('path')
const passport = require('passport')
// const appRoutes = require('./apps/routers/userRoutes')
var bodyParser = require('body-parser')
const AccountModel = require('./apps/models/user')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
var session = require('express-session')
//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json())
// app.use('/public', express.static(path.join(__dirname, '/public')))
// app.use('/client', express.static(path.join(__dirname, '/client')))
app.use(express.static(__dirname + '/apps'));
app.use(express.static(__dirname + '/public'));

const appRoutes = require(__dirname + "/apps/routers/userRoutes");

app.set("views",__dirname + "/apps/views");
app.set("view engine","ejs");

app.use(passport.initialize());
app.use(passport.session());

// passport.serializeUser(function(user, done) {
//   done(null, user);
//   // console.log(user)
//   console.log("1")
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
//   console.log("2")
// });


app.use('/', appRoutes);



app.listen(3000, () => {
  console.log(`Server running on port localhost:3000`)
});