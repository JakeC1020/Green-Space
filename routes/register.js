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
      var email = req.body.email;
      var pass = req.body.password;
      var repeat = req.body.repeat;
      var location = req.body.location;
      // TODO: validate the above for invalid inputs
      
      if (pass !== repeat) {
        req.flash('danger', 'Passwords must match.');
        res.redirect('/register');
        return;
      }
      
      db.registerUser(email, pass, location, function(success) {
        if (success) {
          req.flash('success', 'Registration successful. Please sign in below.');
          res.redirect('/login');
          return;
        }
        
        req.flash('danger', 'Registration failed. Please try again.');
        res.redirect('/register');
      });
    }
  };

  var urlencoded = bodyParser.urlencoded({ extended: false });  
  return { route: '/register', middleware: urlencoded, verbs: verbs };
};
