"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {

    let order = {
      vendor_id: req.body.vendor_id,
      user_id: req.body.user_id,
      est_mins: 0,
      completed: false,
      order_date: new Date().toUTCString()
    }
    let orderID = [];

    console.log('What am I getting here: ', order.order_date);

    knex('orders')
        .insert(order)
        .returning('id')
        .then(id => {
          orderID = id;
        })
        .then(() => {
          let id = (parseInt(orderID));
          return Promise.all(
            req.body.food.map(f => knex('orders_food').insert({order_id: id, food_id: f.id, qty: f.qty}))
          );
        })
        .then(data => {
          console.log('orderfdsfdsafdaf id is: ', orderID );
          res.status(200).send(orderID)
        });
  })

// full list of orders
  router.get("/", (req, res) => {
    knex
        .select(['orders.id', 'orders.user_id', 'orders.vendor_id', 'orders.est_mins','orders.completed', 'orders.order_date',
      'users.name AS user_name' , 'users.email AS user_email', 'users.phone_number AS user_phone_number',
      'vendors.name AS vendor_name', 'vendors.address AS vendor_address', 'vendors.phone_number AS vendor_phone_number'])
        .from('orders')
        .leftJoin('vendors', 'orders.vendor_id', 'vendors.id')
        .leftJoin('users', 'orders.user_id', 'users.id')
        .orderBy('orders.id', 'desc')
        .then((results) => {
          res.json(results);
        });
  });
  router.get("/users", (req, res) => {
    res.redirect("/api/orders");
  })

// food list of a particular order
  router.get("/:id", (req, res) => {
    knex
        .select("*")
        .from('orders_food')
        .leftJoin('orders', 'orders_food.order_id', 'orders.id')
        .leftJoin('food', 'orders_food.food_id', 'food.id')
        .where('orders_food.order_id', req.params.id)
        .then((results) => {
          res.json(results);
        })
  })

  return router;
}




