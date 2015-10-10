var bodyParser = require('body-parser');

module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      res.render('pages/login');
    },
    post: function(req, res) {
      req.session.loggedIn = true;
      res.send('OK');
    }
  };
  
  var urlencoded = bodyParser.urlencoded({ extended: false })
  return { route: '/login', middleware: urlencoded, verbs: verbs };
};
