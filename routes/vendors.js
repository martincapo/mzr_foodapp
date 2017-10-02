"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  return {
    // full list of orders
    getAllOrders: function(cb) {
        knex
            .select(['orders.id', 'orders.completed', 'orders.order_date', 'orders.est_mins', 'users.phone_number'])
            .from('orders')
            .leftJoin('users', 'orders.user_id', 'users.id')
            .orderBy('orders.id', 'desc')
            .then((results) => {
              cb(results);
            });
    },

    getPendingOrders: function(cb) {
        knex
            .select(['orders.id', 'orders.completed', 'orders.order_date','users.name AS user_name'])
            .from('orders')
            .leftJoin('users', 'orders.user_id', 'users.id')
            .where('orders.completed', 'false')
            .orderBy('orders.id', 'desc')
            .then((results) => {
              cb(results);
            });
    }

  }
}


