const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");
const User = require('./models/User.model');

const colorPaletteRouter = require('./controllers/colorPaletteRouter');
const userRouter = require('./controllers/userRouter');

// move to env when deployed
const GOOGLE_CLIENT_ID = "54958304070-mo2h77mu817tm6mkt5d0tstl8opvkibo.apps.googleusercontent.com";
const GOOGLE_SECRET = "aoO4_w__Bs007BbPfDcv8NvX";
const COOKIE_KEY = "chingubears3";
const MONGODB_URL = 'mongodb+srv://admin:FuNq0pwQLfIvGP2Z@cluster0.dak2e.mongodb.net/color-palette?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/palettes", colorPaletteRouter);
app.use("/user", userRouter);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
    maxAge: 24*60*60*1000, // 1 day in ms
    keys:[COOKIE_KEY]
}));

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


router.route('/auth/google').get(passport.authenticate("google", {
    scope: ["email", "profile"]
}));

router.route('/auth/google/redirect').get(passport.authenticate("google"),(req,res)=> {
    res.send(req.user);
    console.log('User reached redirect URI');
});

router.route('/auth/logout').get((req, res) => {
    req.logout();
    res.send(req.user);
    console.log('User logged out');
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
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_SECRET,
            callbackURL: "/auth/google/redirect"
        },
        accessToken => {
            console.log("access token: ", accessToken);
        }
    )
);

passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //check if user already exists in our db with the given profile ID
        User.findOne({googleid: profile.id}).then((currentUser)=> {
            console.log(profile.id);
            if(currentUser) {
                console.log("User already exists");
                //if we already have a record with the given profile ID
                done(null, currentUser);
            } else {
                console.log("User doesn't exist");
                //if not, create a new user 
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

app.use('/', router);


app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
