"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const cookieSession = require('cookie-session')

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const foodRoutes = require("./routes/food");
const twilio = require('./twilio')

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

// orders routes
app.use("/orders", twilio(knex))


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

app.get("/orders/:id", (req, res) => {
  res.render("order")
});

