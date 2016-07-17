var model = require('../models/Questions');
/**
 * GET /
 */
var defaultValues = {
  title: 'Question',
  question: {text: 'elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  relateds: getRelateds(),
};

function getRelateds(tags) {
  if (typeof tags === 'array' && tags.length > 0) {
    return new model.Tag({id: tags[0].id})
      .fetch()
  }
  return Promise.resolve([
    {skill: 'Learn Sewing', id: 1},
    {skill: 'Learn Cooking', id: 2},
    {skill: 'Learn Typing', id: 3},
  ]);
}

/**
 * GET /question
 */
exports.index = function(req, res) {
  new model.Question({id: req.query.id})
    .fetch({withRelated: ['answers']})
    .then(function (question) {
      return Promise.all([
          Promise.resolve(question),
          new model.Translation({id: question.get('translation_id')}).fetch()
      ]);
    })
    .then(function (values) {
      var question = values[0];
      var translation = values[1];
      var foo = {
        title: 'Question',
        question: translation.get('english'),
        answers: question.related('answers'),
      };
      res.render('question', foo);
    }).catch(function (reason) {
      res.render('question', {
        messages: {
          error: reason,
        }
      });
    });
};

function makeTags(tags) {
  ts = [];
  if (typeof tags === 'undefined') {
    return ts;
  }
  for (var i = 0; i < tags.length; i++) {
    ts.push(new question.Tag({id: tags[i]}));
  }
  return ts;
}

/**
 * POST /question/new
 */
exports.createQuestion = function(req, res) {
    req.assert('text', 'You must ask a question to continue').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        req.flash('error', errors);
        return res.redirect('/question/');
    }

    if(!req.user) {
        req.flash('error', 'You must be logged in');
        return res.redirect('/');
    }

    model.Translation.forge({
      english: req.body.text,
    })
    .save()
    .then(function (translation) {
      return model.Question.forge({
        translation_id: translation.get('id'),
      })
      .save()
      .then(function (question) {
        res.json({id: question.get('id')});
      });
    });
};

exports.createAnswer = function(req, res) {
  req.assert('text', 'You must provide an answer to continue').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/question/');
  }

  if (!req.user) {
    req.flash('error', 'You must be logged in');
    return res.redirect('/');
  }

  model.Translation.forge({
    english: req.body.text,
  })
  .save()
  .then(function (translation) {
    return model.Question.forge({
      translation_id: translation.get('id'),
    })
    .save()
  });
}
