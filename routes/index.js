module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      var loggedIn = req.session.loggedIn;
      if (!loggedIn) {
        res.redirect("/login");
      }
      else {
        res.render('pages/index', {
          loggedIn: loggedIn
        });
      }
    }
  };
  
  return { route: '/', verbs: verbs };
};
