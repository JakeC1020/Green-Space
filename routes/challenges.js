module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      res.render('pages/challenges');
    }
  };
  
  return { route: '/challenges', verbs: verbs };
};
