
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let usersArr = [];
  let foodArr = [];
  let ordersArr = [];
        // console.log('blah!!!!')
  return (
    knex('orders_food').del()
    .then(() => {
      return knex('orders').del();
    })
    .then(() => {
      return knex('food').del();
    })
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      return knex('vendors').del();
    })
//users
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({name: 'Gurlz Rule' ,email: 'gurlz_rule_boyz_drool@yahoo.com', phone_number: '1-416-502-2869', password: 1234}),
        knex('users').insert({name: 'Fallen Angel',email: 'Fallen_angel86@hotmail.com', phone_number: '1-647-667-2869', password: 1234}),
        knex('users').insert({name: 'Quirky Gal',email: 'quirkygal101@gmail.com', phone_number: '1-416-668-1169', password: 1234}),
        knex('users').insert({name: 'Ducks Jerks',email: 'ducks_r_jerks@aol.co.uk', phone_number: '1-416-738-1879', password: 1234})
      ]);
    })
    .then(() => {
      return knex.select('id').from('users');
    })
    .then(data => {
      usersArr = data;
      console.log('Seed : Users done')
    })
//vendors
    .then(() => {
      return Promise.all([
        knex('vendors').insert({id: 5, name: 'WOK', address: '1600 Pennsylvania Ave NW, Washington, DC 20500, USA', phone_number: '1-202-456-1111', password: 1234}),
      ]);
    })
    .then(data => console.log('Seed : Vendors done'))
//food
    .then(() => {
      return Promise.all([
        knex('food').insert({name: 'Spicy Cold Noodle', price: 6.15, vendor_id: 5, description: 'Whole wheat spicy noodles', food_img: '1.jpg'}),
        knex('food').insert({name: 'Pecking Duck', price: 10.90, vendor_id: 5, description: 'Straight from Bei Jing', food_img: '2.jpg'}),
        knex('food').insert({name: 'Ma Po Tofu', price: 8.75, vendor_id: 5, description: 'Spicy and hot Tofu', food_img: '3.jpg'}),
        knex('food').insert({name: 'Curry Chicken and Rice', price: 7.50, vendor_id: 5, description: 'Whole wheat spicy noodles', food_img: '4.jpg'}),
        knex('food').insert({name: 'Spicy pork cutlet', price: 5.55, vendor_id: 5, description: 'nice and juicy pork slices!', food_img: '5.jpg'}),
        knex('food').insert({name: 'Sweet and sour soup', price: 7.75, vendor_id: 5, description: 'Super spicy soup!', food_img: '6.jpg'}),
        knex('food').insert({name: 'Steamed fish', price: 12.15, vendor_id: 5, description: 'fish that is steamed to perfection', food_img: '7.jpg'}),
        knex('food').insert({name: 'Kung Pao Chicken', price: 8.99, vendor_id: 5, description: 'Deep fried boneless pork pieces', food_img: '8.jpg'}),
        knex('food').insert({name: 'Spicy cold beef Jerky', price: 5.99, vendor_id: 5, description: 'very spicy! beware!', food_img: '9.jpg'})
      ]);
    })
    .then(() => {
      return knex.select('id').from('food');
    })
    .then(data => {
      foodArr = data;
      console.log('Seed : Food done')
    })
  //orders ::: save only uesr_id & vendor_id
    .then(() => {
      let insetToOrders = [];
      usersArr.forEach(user => {
        foodArr.forEach(food => {
          let estMins = Math.floor((Math.random() * 30) + 10);
          let completed = true;
          insetToOrders.push(knex('orders').insert({vendor_id: 5, user_id: user.id, est_mins: estMins, completed: completed, order_date: new Date(1506703781 * 1000)}));
        })
      });
      return Promise.all(insetToOrders);
    })
    .then(() => {
      return knex.select('id').from('orders');
    })
    .then(data => {
      ordersArr = data;
      console.log('Seed : Orders done')
    })
    .then(() => {
      let insetToOrders = [];
      ordersArr.forEach(orderID => {
        foodArr.forEach(food => {
          let qty = Math.floor((Math.random() * 10) + 1);

          insetToOrders.push(knex('orders_food').insert({order_id: parseInt(orderID.id), food_id: food.id, qty: qty}));
        // return Promise.all(
        //   foodArr.map(f => knex('orders_food').insert({order_id: orderID, food_id: f.id, qty: f.qty}))
        // );
        });
      });
      return Promise.all(insetToOrders);
    })
    .then(data => {
      console.log('Seed : Orders_Food done');
    })
  );
};
