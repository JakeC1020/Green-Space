module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      res.render('pages/login');
    },
    post: function(req, res) {
      req.session.loggedIn = true;
      res.redirect('/');
    }
  };
  
  return { route: '/login', verbs: verbs };
};
