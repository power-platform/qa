var bookshelf = require('../config/bookshelf');

var User = bookshelf.Model.extend({
  tableName: 'questions',
  hasTimestamps: true,

  initialize: function() {
  },

  hashPassword: function(model, attrs, options) {
  },
});

module.exports = Questions;
