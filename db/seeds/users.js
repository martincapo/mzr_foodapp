exports.seed = function(knex, Promise) {
  return knex('food').del()
    .then(function () {
      return Promise.all([
        knex('food').insert({name: 'Spicy Cold Noodle', price: 6.15, description: 'Whole wheat spicy noodles'}),
        knex('food').insert({name: 'Pecking Duck', price: 10.90, description: 'Straight from Bei Jing'}),
        knex('food').insert({name: 'Ma Po Tofu', price: 8.75, description: 'Spicy and hot Tofu'}),
        knex('food').insert({name: 'Curry Chicken and Rice', price: 7.50, description: 'Whole wheat spicy noodles'}),
        knex('food').insert({name: 'Spicy pork cutlet', price: 5.55, description: 'nice and juicy pork slices!'}),
        knex('food').insert({name: 'Sweet and sour soup', price: 7.75, description: 'Super spicy soup!'}),
        knex('food').insert({name: 'Steamed fish', price: 12.15, description: 'fish that is steamed to perfection'}),
        knex('food').insert({name: 'Kung Pao Chicken', price: 8.99, description: 'Deep fried boneless pork pieces'}),
        knex('food').insert({name: 'Spicy cold beef Jerky', price: 5.99, description: 'very spicy! beware!'})
      ]);
    })
    .catch(function(error){
      console.error(error)
    });
};
