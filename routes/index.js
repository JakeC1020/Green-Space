module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      res.render('views/pages/index');
    }
  };
  
  return { route: '/', verbs: verbs };
};
