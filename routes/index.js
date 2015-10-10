module.exports = function(db) {
  var verbs = {
    get: function(req, res) {
      res.sendStatus(200);
    }
  };
  
  return { route: '/', verbs: verbs };
};
