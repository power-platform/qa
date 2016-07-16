var bookshelf = require('../config/bookshelf');

var Question = bookshelf.Model.extend({
  tableName: 'questions',
  hasTimestamps: true,
  answers: function() {
    return this.hasMany(Answer);
  },

  initialize: function() {
  },

  hashPassword: function(model, attrs, options) {
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
  Answer: Answer
};
