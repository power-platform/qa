exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('translations', function(table) {
      table.increments('id').primary();
      table.string('english');
      table.string('nepali');
      table.string('hindi');
    }).createTable('questions', function(table) {
      table.increments('id').primary();
      table.integer('translation_id')
        .references('id')
        .inTable('translations');
      table.string('question_english');
      table.string('location');
      table.string('category');
      table.string('picture');
      table.timestamps();
    }).createTable('answers', function(table) {
      table.increments('id').primary();
      table.string('answer_english');
      table.integer('translation_id')
        .references('id')
        .inTable('translations');
      table.integer('question_id')
        .references('id')
        .inTable('questions')
        .notNullable();
      table.timestamps();
    }).createTable('tags', function(table) {
      table.increments('id').primary();
      table.string('tag_english');
      table.integer('translation_id')
        .references('id')
        .inTable('translations');
    }).createTable('questions_tags', function(table) {
      table.integer('question_id')
        .references('id')
        .inTable('questions');
      table.integer('tag_id')
        .references('id')
        .inTable('tags');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('translations'),
    knex.schema.dropTable('questions'),
    knex.schema.dropTable('answers'),
    knex.schema.dropTable('tags'),
    knex.schema.dropTable('questions_tags'),
  ]);
};
