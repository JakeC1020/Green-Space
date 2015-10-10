module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      var loggedIn = req.session.loggedIn;
      if (!loggedIn) {
        res.redirect("/login");
      }
      else {
        res.render('pages/profile', {
          loggedIn: loggedIn
        });
      }
    }
  };
  
  return { route: '/profile', verbs: verbs };
};
