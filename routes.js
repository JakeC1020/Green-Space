var fs = require('fs');
var routes = fs.readdirSync('./routes');

module.exports = function(app) {
  routes.forEach(function(entry) {
    var route = require('./routes/' + entry);
    
    for (var verb in route.verbs) {
      app[verb](route.route, route.verbs[verb]);
    }
  });
};
