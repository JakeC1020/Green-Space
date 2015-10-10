module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      res.render('views/pages/profile');
    }
  };
  
  return { route: '/profile', verbs: verbs };
};
