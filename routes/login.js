var bodyParser = require('body-parser');

module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      if (req.session.auth) {
        res.redirect('/');
        return;
      }
      
      res.render('pages/login');
    },
    post: function(req, res) {
      var user = req.body.username;
      var pass = req.body.password;
      
      db.authenticate(user, pass, function(pass) {
        if (pass) {
          req.session.auth = true;
          res.redirect('/');
          return;
        }
        
        res.redirect('/login');
      });
    }
  };
  
  var urlencoded = bodyParser.urlencoded({ extended: false })
  return { route: '/login', middleware: urlencoded, verbs: verbs };
};
