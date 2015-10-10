module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      res.render('pages/index');
    }
  };
  
  return { route: '/', verbs: verbs };
};
