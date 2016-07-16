exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('questions', function(table) {
      table.increments();
      table.string('question');
      table.string('question-nepali');
      table.string('location');
      table.string('category');
      table.string('picture');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('questions')
  ]);
};
