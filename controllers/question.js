/**
 * GET /
 */
var defaultValues = {
  title: 'Question'
};

function getQuestion(req) {
  return Promise.resolve('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!');
}

function getAnswers(req) {
  return Promise.resolve([]);
}

function getRelateds(req) {
  return [
    {skill: 'Learn Sewing', id: 1},
    {skill: 'Learn Cooking', id: 2},
    {skill: 'Learn Typing', id: 3},
  ]
}

exports.index = function(req, res) {
  Promise.all([
      getQuestion(req),
      getAnswers(req),
      getRelateds(req),
  ]).then(function (values) {
    res.render('question', {
      title: 'Question',
      question: values[0],
      answers: values[1],
      relateds: values[2],
    });
  }).catch(function (error) {
    res.render('question', defaultValues);
  });
};
