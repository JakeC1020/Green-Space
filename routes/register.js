module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      var loggedIn = req.session.loggedIn;
      if (loggedIn) {
        res.redirect("/");
      }
      res.render('pages/register');
    },
    post: function(req, res) {
      req.session.loggedIn = true;
      res.redirect('/');
    }
  };
  
  return { route: '/register', verbs: verbs };
};
