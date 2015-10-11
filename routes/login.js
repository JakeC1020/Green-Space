var bodyParser = require('body-parser');

module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      var loggedIn = req.session.auth;
      if (loggedIn) {
        res.redirect('/');
        return;
      }
      else {
        res.render('pages/login', {
          loggedIn: loggedIn
        });
      }
    
    },
    post: function(req, res) {
      var user = req.body.email;
      var pass = req.body.password;
      
      db.authenticate(user, pass, function(pass, info) {
        if (pass) {
          req.session.auth = true;
          req.session.id = info.id;
          res.redirect('/');
          return;
        }
        
        req.flash('danger', 'Unrecognized username or password.');
        res.redirect('/login');
      });
    }
  };
  
  var urlencoded = bodyParser.urlencoded({ extended: false });
  return { route: '/login', middleware: urlencoded, verbs: verbs };
};
