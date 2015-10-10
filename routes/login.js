module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      res.render('pages/login');
    }
  };
  
  return { route: '/login', verbs: verbs };
};
