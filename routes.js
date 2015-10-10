var fs = require('fs');
var debug = require('debug')('green-space:router');
var routes = fs.readdirSync('./routes');
var database = require('./lib/database');

module.exports = function(app) {
  routes.forEach(function(entry) {
    var route = require('./routes/' + entry)(database);
    
    for (var verb in route.verbs) {
      debug('load ' + verb.toUpperCase() + ' ' + route.route);
      
      var args = [route.route];
      if (route.middleware) {
        args.push(route.middleware);
        debug('applying middleware to route');
      }
      args.push(route.verbs[verb]);
      app[verb].apply(app, args);
    }
  });
};
