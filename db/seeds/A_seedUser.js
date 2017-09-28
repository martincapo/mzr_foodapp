
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({name: 'Gurlz Rule' ,email: 'gurlz_rule_boyz_drool@yahoo.com', phone_number: '1-416-502-2869', password: 1234}),
        knex('users').insert({name: 'Fallen Angel',email: 'Fallen_angel86@hotmail.com', phone_number: '1-647-667-2869', password: 1234}),
        knex('users').insert({name: 'Quirky Gal',email: 'quirkygal101@gmail.com', phone_number: '1-416-668-1169', password: 1234}),
        knex('users').insert({name: 'Ducks Jerks',email: 'ducks_r_jerks@aol.co.uk', phone_number: '1-416-738-1879', password: 1234})
      ]);
    })
    .then(data => console.log('Seed A: Users done'));
};
