"use strict";

const express = require('express');
const router  = express.Router();



module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.json([
      {name: "BBQ", price: 30},
      {name: "asparagus", price: 15},
      {name: "apples", price: 10},
      {name: "avocado", price: 12},
      {name: "Apple Juice",price: 5}
    ])
    // knex
    //   .select("*")
    //   .from("food")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  return router;
}
