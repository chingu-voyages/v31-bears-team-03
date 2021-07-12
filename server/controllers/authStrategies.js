var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User.model')

const GOOGLE_CLIENT_ID = "54958304070-mo2h77mu817tm6mkt5d0tstl8opvkibo.apps.googleusercontent.com";
const GOOGLE_SECRET = "aoO4_w__Bs007BbPfDcv8NvX";
const GITHUB_CLIENT_ID = "41cc5b5681b7237db07c";
const GITHUB_SECRET = "c82779fb201c5e278f829ced7e83fb3505fd3f1e"
const FACEBOOK_APP_ID = "835801480474977"
const FACEBOOK_APP_SECRET = "f84e71ad7fe8d431fdc386ac2ed53657"
const TWITTER_CONSUMER_KEY = "7BOCLOT3Hqm6elIvsurMjejXX"
const TWITTER_CONSUMER_SECRET = "jXQ5JjOy6tIVuYqwinQ9QZKvG8nkUQxnp5DxOZerHw7QnbhDeG"


module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
      await User.findById(id).then((user) => {
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

    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/redirect'
      },
      function(accessToken, refreshToken, profile, done) {
        
        User.findOne({facebookid: profile.id}).then((currentUser)=> {
            if(currentUser) {
                console.log("User already exists");
                done(null, currentUser);
            } else {
                console.log("User doesn't exist");
                new User({
                    facebookid: profile.id,
                    name: profile.displayName,
                    email: Array.isArray(profile.emails) ? profile.emails[0].value : 'No public email',
                    provider: profile.provider || ''
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            } 
        })
    }));

    passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: '/auth/twitter/redirect'
      },
      function(accessToken, refreshToken, profile, done) {
        
        User.findOne({twitterid: profile.id}).then((currentUser)=> {
            if(currentUser) {
                console.log("User already exists");
                done(null, currentUser);
            } else {
                console.log("User doesn't exist");
                new User({
                    twitterid: profile.id,
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