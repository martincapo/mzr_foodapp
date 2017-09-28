exports.seed = function(knex, Promise) {
  return knex('food').del()
    .then(function () {
      return Promise.all([
        knex('food').insert({name: 'Spicy Cold Noodle', price: 6.15, vendorid: 5, description: 'Whole wheat spicy noodles'}),
        knex('food').insert({name: 'Pecking Duck', price: 10.90, vendorid: 5, description: 'Straight from Bei Jing'}),
        knex('food').insert({name: 'Ma Po Tofu', price: 8.75, vendorid: 5, description: 'Spicy and hot Tofu'}),
        knex('food').insert({name: 'Curry Chicken and Rice', price: 7.50, vendorid: 5, description: 'Whole wheat spicy noodles'}),
        knex('food').insert({name: 'Spicy pork cutlet', price: 5.55, vendorid: 5, description: 'nice and juicy pork slices!'}),
        knex('food').insert({name: 'Sweet and sour soup', price: 7.75, vendorid: 5, description: 'Super spicy soup!'}),
        knex('food').insert({name: 'Steamed fish', price: 12.15, vendorid: 5, description: 'fish that is steamed to perfection'}),
        knex('food').insert({name: 'Kung Pao Chicken', price: 8.99, vendorid: 5, description: 'Deep fried boneless pork pieces'}),
        knex('food').insert({name: 'Spicy cold beef Jerky', price: 5.99, vendorid: 5, description: 'very spicy! beware!'})
      ]);
    })
    .then(data => console.log('Seed B: Foods done'))
    .catch(function(error){
      console.error(error)
    });
};
