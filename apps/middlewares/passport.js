const passport = require('passport');
require('dotenv').config;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const privateKey = process.env.APP_PRIVATE_KEY;
const User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function (user) {
      done(null, user);
  }).catch(function (err) {
      console.log(err);
  })
});

passport.use(new LocalStrategy(
    (username, password, cb) => {
      User.findOne({ username: username }, (error, user) => {
        if (error) {
          cb({error: true})
        } else if (!user) {
          cb(null, false)
        } else {
          user.verifyPassword(password, (matchError, isMatch) => {
            console.log(isMatch)
            if (matchError) {
              cb(null, false)
            } else if (!isMatch) {
              cb(null, false)
            } else {
              cb(null, user)
            }
          })
        }
      })
    }
))
        
        
//         , (err, user) => {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));

const cookiesExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access-token"]
    }
    return token;
}

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: cookiesExtractor,
            secretOrKey: "privateKey"
        },
        (payload, done) => {
            User.findById({ _id: payload.sub }, (err, user) => {
                if (err) return done(err, false);
                if (user) return done(null, user);
                else return done(null, false);
            })
        })
)