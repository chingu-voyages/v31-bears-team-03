const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const userRoutes = express.Router();
const router = express.Router();

const colorPaletteRouter = require('./controllers/colorPaletteRouter');
const userRouter = require('./controllers/userRouter');


// move to env when deployed
const PORT = 4000;
const MONGODB_URL = 'mongodb+srv://admin:FuNq0pwQLfIvGP2Z@cluster0.dak2e.mongodb.net/color-palette?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/palettes", colorPaletteRouter);
app.use("/user", userRouter);


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



app.use('/', router);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
