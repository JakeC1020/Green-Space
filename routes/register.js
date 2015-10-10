module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      res.render('pages/register');
    }
  };
  
  return { route: '/register', verbs: verbs };
};
