
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vendors').del()
    .then(function () {
      return Promise.all([
        knex('vendors').insert({id: 5, name: 'Madarin', address: '1600 Pennsylvania Ave NW, Washington, DC 20500, USA', phone_number: '1-202-456-1111', password: 1234}),
      ]);
    })
    .then(data => console.log('Seed C: Vendors done'));;
};
