exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  let users = null;
  return knex('orders').del()
    .then(findUser)
    .then(data => {
      users = data
      return findFood()
    })
    .then(food => createOrder(users, food))
    .then(data => console.log('Seed D: Vendors done'));

    function findUser() {
      return knex('users').first()
      // return knex('users').where({email: "gurlz_rule_boyz_drool@yahoo.com"}).first()
    }
     function findFood() {
      return knex('food').first()
      // return knex('users').where({email: "gurlz_rule_boyz_drool@yahoo.com"}).first()
    }

    function createOrder(user, food) {
      return knex('orders').insert({vendor_id: 5, user_id: users.id, completed: true})
    }
};
