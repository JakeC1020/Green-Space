var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var debug = require('debug')('green-space:database');

var config = require('../config/database');
var connection = mysql.createConnection(config);

debug('attempting database connection');
connection.connect(function(err) {
  if (!err) {
    debug('database connection successful');
    return;
  }
  
  debug('failed to connect to database');
  process.exit(1);
});

var authenticate = function(user, pass, fn) {
  // TODO: use pseudo-prepared statements
  var query = 'SELECT pass FROM users WHERE username=' + user;
  
  connection.query(query, function(err, rows, fields) {
    if (err) {
      debug('error during authentication');
      return fn(false);
    }
    
    if (rows.length !== 1) {
      debug('multiple rows returned during authentication');
      return fn(false);
    }
    
    var hash = rows[0].pass_hash;
    bcrypt.compare(pass, hash, function(err, res) {
      if (err) {
        debug('unable to compare bcrypt hash');
        return fn(false);
      }
      
      return fn(res);
    });
    
  });
};

module.exports = {
  authenticate: authenticate
};
