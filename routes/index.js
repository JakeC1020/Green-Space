module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      var auth = req.session.auth;
      
      if (!auth) {
        res.redirect('/login');
        return;
      }
      
      res.render('pages/index');
    }
  };
  
  return { route: '/', verbs: verbs };
};
