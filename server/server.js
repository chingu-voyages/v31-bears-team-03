const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("cookie-session");
require('dotenv').config();

const authStrategies = require("./controllers/authStrategies");
const authRouter = require("./controllers/authRouter");
const userAndColorPaletteRouter = require("./controllers/userAndColorPaletteRouter");

// create new id+secrets for heroku and move to env when deployed
// const MONGODB_URL = process.env.MONGODB_URL
const SECRET = "chingubears3";
const MONGODB_URL = 'mongodb+srv://admin:FuNq0pwQLfIvGP2Z@cluster0.dak2e.mongodb.net/color-palette?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(
  session({
    maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    keys: [SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to the database. \n${err}");
  });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB successfully connected");
});

app.use("/", authRouter);
app.use("/", userAndColorPaletteRouter);
authStrategies();

app.get(
  "/auth/user",
  (req, res, next) => {
    if (req.user) {
      console.log("req.user", req.user);
      next();
    } else {
      res.status(401).send("You must login first!");
    }
  },
  (req, res) => {
    res.json(req.user);
  }
);

app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});
