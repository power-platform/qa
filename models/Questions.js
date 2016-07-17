var bookshelf = require('../config/bookshelf');

var Translation = bookshelf.Model.extend({
  tableName: 'translations',
});

var Tag = bookshelf.Model.extend({
  tableName: 'tags',
  questions: function() {
    return this.belongsToMany(Question);
  },
  text: function() {
    return this.hasOne(Translation);
  }
});

var Question = bookshelf.Model.extend({
  tableName: 'questions',
  hasTimestamps: true,
  text: function() {
    return this.hasOne(Translation);
  },
  answers: function() {
    return this.hasMany(Answer);
  },

  tags: function() {
    return this.belongsToMany(Tag);
  },

  initialize: function() {
  },
});

var Answer = bookshelf.Model.extend({
  tableName: 'answers',
  hasTimestamps: true,
  text: function() {
    return this.hasOne(Translation);
  },
  question: function() {
    return this.belongsTo(Question);
  }
});

module.exports = {
  Question: Question,
  Answer: Answer
};
