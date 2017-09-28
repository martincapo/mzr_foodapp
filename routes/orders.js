"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
        .select('*')
        .from('orders')
        .leftJoin('vendors', 'orders.vendor_id', 'vendors.id')
        .leftJoin('users', 'orders.user_id', 'users.id')
        .then((results) => {
          res.json(results);
        });
  });
 // knex
 //      .select("*")
 //      .from("orders, vendors, users")
 //      .then((results) => {
 //        res.json(results);
 //    });
  return router;
}
