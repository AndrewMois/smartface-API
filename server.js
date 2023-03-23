const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "142.198.25.41",
    port: 3306,
    user: "pi",
    password: "WOWWOW000",
    database: "smartbrain",
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("It is working!");
});

// SIGN IN
app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, knex, bcrypt);
});

// REGISTER
app.post("/register", (req, res) => {
  register.handleRegister(req, res, knex, bcrypt);
});

// PROFILE
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, knex);
});

// IMAGE
app.put("/image", (req, res) => {
  image.handleImage(req, res, knex);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
