var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User.model')

const GOOGLE_CLIENT_ID = "54958304070-mo2h77mu817tm6mkt5d0tstl8opvkibo.apps.googleusercontent.com";
const GOOGLE_SECRET = "aoO4_w__Bs007BbPfDcv8NvX";
const GITHUB_CLIENT_ID = "41cc5b5681b7237db07c";
const GITHUB_SECRET = "c82779fb201c5e278f829ced7e83fb3505fd3f1e"


module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            done(null, user);
        });
    });
    
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },function(email, password, done) {
            User.findOne({ email: email }, function(err, user) {
                if (!user)
                    return done(null, false);
                if (err)
                    return done(err);
    
                var validPassword = bcrypt.compareSync(password, user.password);
                if (!validPassword) {
                    return done(null, false);
                }
                return done(null, user);        
            });
        })
    );
    
    passport.use(
        new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_SECRET,
            callbackURL: '/auth/google/redirect'
        }, (accessToken, refreshToken, profile, done) => {
            User.findOne({googleid: profile.id}).then((currentUser)=> {
                if(currentUser) {
                    console.log("User already exists");
                    done(null, currentUser);
                } else {
                    console.log("User doesn't exist");
                    new User({
                        googleid: profile.id,
                        name: profile.displayName,
                        email: Array.isArray(profile.emails) ? profile.emails[0].value : 'No public email',
                        provider: profile.provider || ''
                    }).save().then((newUser) => {
                        done(null, newUser);
                    });
                } 
            })
        })
    );
    
    passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_SECRET,
        callbackURL: '/auth/github/redirect'
      },
      function(accessToken, refreshToken, profile, done) {
        
        User.findOne({githubid: profile.id}).then((currentUser)=> {
            if(currentUser) {
                console.log("User already exists");
                done(null, currentUser);
            } else {
                console.log("User doesn't exist");
                new User({
                    githubid: profile.id,
                    name: profile.displayName,
                    email: Array.isArray(profile.emails) ? profile.emails[0].value : 'No public email',
                    provider: profile.provider || ''
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            } 
        })
    }));
}