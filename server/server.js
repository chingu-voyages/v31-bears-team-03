const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const LocalStrategy = require('passport-local');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const session = require("cookie-session");
const User = require('./models/User.model');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const colorPaletteRouter = require('./controllers/colorPaletteRouter');
const userRouter = require('./controllers/userRouter');


// create new id+secrets for heroku and move to env when deployed
const GOOGLE_CLIENT_ID = "54958304070-mo2h77mu817tm6mkt5d0tstl8opvkibo.apps.googleusercontent.com";
const GOOGLE_SECRET = "aoO4_w__Bs007BbPfDcv8NvX";
const GITHUB_CLIENT_ID = "41cc5b5681b7237db07c";
const GITHUB_SECRET = "c82779fb201c5e278f829ced7e83fb3505fd3f1e"
const PORT = 4000;
const MONGODB_URL = 'mongodb+srv://admin:FuNq0pwQLfIvGP2Z@cluster0.dak2e.mongodb.net/color-palette?retryWrites=true&w=majority';
const SECRET = 'chingubears3';

app.use(cors());
app.use(express.json());
app.use("/palettes", colorPaletteRouter);
app.use("/user", userRouter);
app.use(session({
    maxAge: 24*60*60*1000, // 1 day in ms
    keys:[SECRET]
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error('Error connecting to the database. \n${err}');
    });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB successfully connected");
});


router.route('/auth/login').post(passport.authenticate('local'), (req, res)=> {
    var token = jwt.sign({ id: req.user.id }, SECRET, {
        expiresIn: 86400 // 24 hours
    });
    req.user.access_token = token;
    res.send({  likedPalettes: req.user.likedPalettes,
                name: req.user.name,
                email: req.user.email,
                access_token: token });
});

router.route('/auth/google').get(passport.authenticate("google", {
    scope: ["email", "profile"]
}));

router.route('/auth/google/redirect').get(passport.authenticate("google"),(req,res)=> {
    var token = jwt.sign({ id: req.user.id }, SECRET, {
        expiresIn: 86400 // 24 hours
    });
    req.user.access_token = token;
    res.send({  likedPalettes: req.user.likedPalettes,
                name: req.user.name,
                email: req.user.email,
                access_token: token });
});

router.route('/auth/github').get(passport.authenticate("github"));

router.route('/auth/github/redirect').get(passport.authenticate("github"), (req, res)=> {
    var token = jwt.sign({ id: req.user.id }, SECRET, {
        expiresIn: 86400 // 24 hours
    });
    req.user.access_token = token;
    res.send({  likedPalettes: req.user.likedPalettes,
                name: req.user.name,
                email: req.user.email,
                access_token: token });
});

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

app.use('/', router);


app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
