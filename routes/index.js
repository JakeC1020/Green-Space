module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      var auth = req.session.auth;
      
      if (!auth) {
        res.redirect('/login');
        return;
      }
      else {
        res.render('pages/index', {
          loggedIn: auth
        });
      }
    }
  };
  
  return { route: '/', verbs: verbs };
};
