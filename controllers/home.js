var questions = require('../models/Questions')
/**
 * GET /
 */
function getSkills(count, req) {
  var defaults = require("../models/Skills").list();
  
  return questions.Question.fetchAll()
    .then(function (questions) {
      var len = Math.min(count, questions.length);
      var ret = [];
      var i = 0;
      for (; i < len; i++) {
        ret.push({
          id: questions[i].id,
          skill: questions[i].question,
        });
      }
      for (; i < count; i++) {
        ret.push(defaults[i]);
      }
      return ret;
    })
    .catch(function (reason) {
      return defaults;
    });
}


function getLanguages(count, req) {
  return Promise.resolve({
    primary: [
      {language: 'English', active: true},
      {language: 'नेपाली'},
      // {language: 'हिन्दी'},
    ]
  });
}

exports.index = function(req, res) {
  Promise.all([
    getSkills(6, req),
    getLanguages(3, req),
  ]).then(function (values) {
    res.render('home', {
      title: 'Home',
      skills: values[0],
      languages: values[1],
    });
  }).catch(function (reason) {
    res.render('home', {
      title: 'Wat.',
      skills: [],
      languages: {}
    });
  });
};
