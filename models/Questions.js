var bookshelf = require('../config/bookshelf');

var Translation = bookshelf.Model.extend({
  tableName: 'translations',
});

var Tag = bookshelf.Model.extend({
  tableName: 'tags',
  questions: function() {
    return this.belongsToMany(Question);
  },
});

var Question = bookshelf.Model.extend({
  tableName: 'questions',
  answers: function() {
    return this.hasMany(Answer);
  },
  tags: function() {
    return this.belongsToMany(Tag);
  },
});

var Answer = bookshelf.Model.extend({
  tableName: 'answers',
  hasTimestamps: true,
  question: function() {
    return this.belongsTo(Question);
  }
});

module.exports = {
  Question: Question,
  Answer: Answer,
  Translation: Translation,
  Tag: Tag,
};
