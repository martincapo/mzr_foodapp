"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

// full list of orders
  router.get("/", (req, res) => {
    knex
        .select("*")
        .from("users")
        .then((results) => {
          res.json(results);
        });
  });
  router.get("/users", (req, res) => {
    res.redirect("/api/orders");
  })

// // food list of a particular order
//   router.get("/:id", (req, res) => {
//     knex
//         .select("*")
//         .from('orders_food')
//         .leftJoin('orders', 'orders_food.order_id', 'orders.id')
//         .leftJoin('food', 'orders_food.food_id', 'food.id')
//         .where('orders_food.order_id', req.params.id)
//         .then((results) => {
//           res.json(results);
//         })
//   })


// order list of a particular user
  router.get("/:user_id/orders", (req, res) => {
    knex
        .select(['orders.id', 'orders.user_id', 'orders.vendor_id', 'orders.est_mins', 'orders.completed', 'orders.order_date',
      'users.name AS user_name' , 'users.email AS user_email', 'users.phone_number AS user_phone_number',
      'vendors.name AS vendor_name', 'vendors.address AS vendor_address', 'vendors.phone_number AS vendor_phone_number'])
        .from('orders')
        .leftJoin('vendors', 'orders.vendor_id', 'vendors.id')
        .leftJoin('users', 'orders.user_id', 'users.id')
        .where('orders.user_id', req.params.user_id)
        .then((results) => {
          res.json(results);
        });
  })

  // a particular order of a particular user
  router.get("/:user_id/orders/:order_id", (req, res) => {
    knex
        .select(['orders.id', 'orders.user_id', 'orders.vendor_id', 'orders.est_mins', 'orders.completed', 'orders.order_date',
      'users.name AS user_name' , 'users.email AS user_email', 'users.phone_number AS user_phone_number',
      'vendors.name AS vendor_name', 'vendors.address AS vendor_address', 'vendors.phone_number AS vendor_phone_number'])
        .from('orders')
        .leftJoin('vendors', 'orders.vendor_id', 'vendors.id')
        .leftJoin('users', 'orders.user_id', 'users.id')
        .where('orders.user_id', req.params.user_id)
        .andWhere('orders.id', req.params.order_id)
        .then((results) => {
          res.json(results);
        });
  })

  // food list of a particular order
  router.get("/:user_id/orders/:order_id/food", (req, res) => {
    knex
        .select("*")
        .from('orders_food')
        .leftJoin('orders', 'orders_food.order_id', 'orders.id')
        .leftJoin('food', 'orders_food.food_id', 'food.id')
        .where('orders_food.order_id', req.params.order_id)
        .then((results) => {
          res.json(results);
        })
  })


  return router;
}







// "use strict";

// const express = require('express');
// const router  = express.Router();

// module.exports = (knex) => {

//   router.get("/", (req, res) => {
//     knex
//       .select("*")
//       .from("users")
//       .then((results) => {
//         res.json(results);
//     });
//   });

//   return router;
// }
