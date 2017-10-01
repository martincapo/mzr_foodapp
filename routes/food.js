"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  router.get("/", (req, res) => {
    const id = req.session.user_id
    let result = {}
    knex
      .select("*")
      .from("food")
      .then((results) => {
        result = {
          data: results,
          id
        }
        res.json(result)
    });
  });

  return router;
}
