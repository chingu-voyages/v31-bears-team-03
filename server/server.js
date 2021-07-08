const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("cookie-session");

const authStrategies = require('./controllers/authStrategies');
const authRouter = require('./controllers/authRouter');
const userAndColorPaletteRouter = require('./controllers/userAndColorPaletteRouter');


// create new id+secrets for heroku and move to env when deployed
const MONGODB_URL = 'mongodb+srv://admin:FuNq0pwQLfIvGP2Z@cluster0.dak2e.mongodb.net/color-palette?retryWrites=true&w=majority';
const SECRET = 'chingubears3';
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use("/", userAndColorPaletteRouter);
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

app.use('/', authRouter)
authStrategies()


app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
