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
    return this.hasOne(Translation, 'tag_text');
  }
});

var Question = bookshelf.Model.extend({
  tableName: 'questions',
  text: function() {
    return this.hasOne(Translation, 'question_text');
  },
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
  text: function() {
    return this.hasOne(Translation, 'answer_text');
  },
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
