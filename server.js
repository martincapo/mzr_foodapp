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

// orders routes
app.use("/orders", twilio(knex))


// Home page
app.get("/", (req, res) => {
  let userId = req.session.user_id;
  if(!userId) {
    res.render("index", {user: userId});
  } else {
    res.redirect(`/users/${userId}`)
  }
});

// Menu page
app.get("/users/:id", (req, res) => {
  let userId = req.session.user_id;
  let templateVars = {
    user: userId
  };
  res.render("menus", templateVars);
});

// Orders list of User
app.get("/users/:id/orders", (req, res) => {
  const id = req.params.id;
  res.render("order_history", {user: id});
});

app.get("/orders/:id", (req, res) => {
  const id = req.params.id
  res.render("order", {id})
});

// A particular Order of User
app.get("/users/:user_id/orders/:order_id", (req, res) => {
  const info = { user_id: req.params.user_id, order_id: req.params.order_id };
  res.render("orders_show", info);
});

app.get("/usersOrder/:id", (req, res) => {
  console.log('im calledddddd')
  const id = req.params.id
  const url = `/users/${id}/order/neworder`
  res.redirect(url)
})

app.get("/users/:id/order/neworder", (req, res) => {
  const id = req.params.id
  res.render("new_order", {user: id})
});

//orderMessage page
app.post("/orderMessage", (req, res) => {
  res.render("orderMessage")
});


app.listen(PORT, () => {
  console.log("mzr_foodapp listening on port " + PORT);
});


app.get("/login", (req, res) => {
  let userId = req.session.user_id;
  if(!userId){
    res.render("login", {user: userId});
  } else {
    res.redirect(`/users/${userId}`);
  }
});

app.get("/registration", (req, res) => {
  let userId = req.session.user_id;

  if(!userId){
    res.render("registration", {user: userId});
  } else {
    res.redirect(`/users/${userId}`)
  }
});

let users = {};

app.post("/registration", (req, res) => {
  if (req.body.email === '' || req.body.password === '' || req.body.userName === '' || req.body.userPhone === '')
  {
    res.status(400).send("No email or password has been entered.");
    return;
  }

    let rawEmail = req.body.email;

    let userData = {
      name: req.body.userName,
      email: rawEmail.toLowerCase(),
      phone_number: req.body.userPhone,
      password: req.body.password
    }

   knex.select('email').table('users').where('email', req.body.email)
      .then(result => {
          if(result.length === 0) {
            knex('users')
                .insert(userData)
                .then(data => {
                  res.redirect('/login');
                });
          } else {
            res.status(400).send("That email already exists!");
            return;
          }
        })
  })

app.post("/login", (req, res) => {

let rawEmail = req.body.email;

knex.select('id').table('users')
  .where('email', rawEmail.toLowerCase())
  .where('password', req.body.password)
  .then(result => {
      if(result.length === 0) {
        res.status(403).send('password or email does not match please try again.');
      } else {
        const id = result[0].id;
        req.session.user_id = id;
        res.redirect(`/users/${id}`);
      }
  })
})

app.get("/vendor", (req, res) => {
  res.render('vendor')
})

app.get("/logout", (req, res) => {
  delete req.session.user_id;
  res.redirect("/");
});

// app.get('/orders/order', (req, res) => {
//   res.render("order_history")
// });

const possibleValues = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function generateRandomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i){
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

