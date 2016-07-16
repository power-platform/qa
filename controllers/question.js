/**
 * GET /
 */
exports.index = function(req, res) {
  res.render('question', {
    title: 'Question'
  });
};
