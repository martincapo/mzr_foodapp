"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const cookieSession = require('cookie-session')
const bcrypt        = require('bcrypt');

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const foodRoutes = require("./routes/food");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(cookieSession({
  name: 'session',
  keys: ["pepsicola"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Mount all resource routes
app.use("/api/orders", ordersRoutes(knex));

// Mount all resource routes
app.use("/api/food", foodRoutes(knex));


// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Munu page
app.get("/menus", (req, res) => {

  if(req.order){
    Cookies.remove('order');
  }

  let userId = req.session.user_id;
  let templateVars = {
    user: userId
  };
  res.render("menus", templateVars);
});

// Orders list of User
app.get("/users/:id/orders", (req, res) => {
  res.render("orders_index");
});

// A particular Order of User
app.get("/users/:id/orders/:id", (req, res) => {
  res.render("orders_show");
});

//orderMessage page
app.get("/orderMessage", (req, res) => {
  res.render("orderMessage")
});


app.listen(PORT, () => {
  console.log("mzr_foodapp listening on port " + PORT);
});

app.get("/login/:id", (req, res) => {

  req.session.user_id = req.params.id;
  let userId = req.session.user_id;
  let templateVars = {
    user: userId
  };
    res.render("menus", templateVars);
});

app.get("/registration", (req, res) => {
    res.render("registration");
});

let users = {};

app.post("/registration", (req, res) => {
  for(var i in users){
    if(req.body.email.toLowerCase() == users[i].email.toLowerCase())
    {
      res.status(400).send("e-mail is already existing in user's database.");
      res.redirect("/register");
      return;
    }
  }

  // this checks to see if the email entered into the form already exist in users or not
  // if it does exist, it sends a status400 code

  if (req.body.email === '' || req.body.password === '')
  {
    res.status(400).send("No email or password has been entered.");
    return;
  }

  let result = generateRandomString(4, possibleValues);
  let password = req.body.password;
  let hashedPassword = bcrypt.hashSync(password, 10);
  users[result] = {id: result, email: req.body.email, password: hashedPassword}
  req.session.user_id = result;
  console.log(users);
  res.redirect("/urls");
});

app.get("/orders/:id", (req, res) => {
  res.render("order")
});

const possibleValues = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function generateRandomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i){
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

