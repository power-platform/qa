exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('questions', function(table) {
      table.increments('id').primary();
      table.string('question');
      table.string('question-nepali');
      table.string('question-hindi');
      table.string('location');
      table.string('category');
      table.string('picture');
      table.timestamps();
    }).createTable('answers', function(table) {
      table.increments('id').primary();
      table.string('answer');
      table.string('answer-nepali');
      table.string('answer-hindi');
      table.uuid('question_id')
        .references('id')
        .inTable('questions')
        .notNullable();
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('questions'),
    knex.schema.dropTable('answers')
  ]);
};
