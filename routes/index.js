module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      var auth = req.session.auth;
      
      if (!auth) {
        res.redirect('/login');
        return;
      }
      
      db.listChallenges(req.session.id, function(list) {
        res.render('pages/index', {
          challenges: list
        });
        
      });
      
    }
  };
  
  return { route: '/', verbs: verbs };
};
