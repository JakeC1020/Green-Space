var bodyParser = require('body-parser');

module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      var loggedIn = req.session.loggedIn;
      if (loggedIn) {
        res.redirect("/");
      }
      else {
        res.render('pages/register', {
          loggedIn: loggedIn
        });
      }
    },
    post: function(req, res) {
      req.session.loggedIn = true;
      res.redirect('/');
    }
  };

  var urlencoded = bodyParser.urlencoded({ extended: false });  
  return { route: '/register', middleware: urlencoded, verbs: verbs };
};
