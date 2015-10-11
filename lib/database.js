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

var listChallenges = function(userId, fn) {
  var query = 'SELECT * FROM challenges';
  debug('execute: ' + query);
  connection.query(query, function(err, rows, fields) {
    if (err) {
      debug('error fetching challenges from database');
      console.error(err);
      return fn([]);
    }
    
    debug('successfully fetched challenges from database');
    return fn(rows);
  });
};

var registerUser = function(user, pass, location, fn) {
  var salt= null;
  bcrypt.hash(pass, salt, null, function(err, hash) {
    if (err) {
      debug('bcrypt password hashing failed');
      return fn(false);
    }
    
    var query = 'INSERT INTO users VALUES (\'\', \'' + user + '\', \'' + hash + '\', \'' + location+ '\', \'\', \'\', \'\')';
    debug('execute: ' + query);
    connection.query(query, function(err, rows, fields) {
      if (err) {
        debug('error inserting user into database');
        console.error(err);
        return fn(false);
      }
      
      debug('user was created successfully');
      return fn(true);
    });
  });
};

var authenticate = function(user, pass, fn) {
  // TODO: use pseudo-prepared statements
  var query = 'SELECT * FROM users WHERE email=\'' + user + '\'';
  debug('execute: ' + query);
  
  connection.query(query, function(err, rows, fields) {
    if (err) {
      debug('error accessing database during authentication');
      console.error(err);
      return fn(false);
    }
    
    if (rows.length > 1) {
      debug('multiple rows returned during authentication');
      return fn(false);
    }
    
    if (!rows.length) {
      debug('no rows matching user found');
      return fn(false);
    }
    
    var hash = rows[0].pass_hash;
    bcrypt.compare(pass, hash, function(err, res) {
      if (err) {
        debug('unable to compare bcrypt hash');
        return fn(false);
      }
      
      debug('authentication passed successfully');
      return fn(res, rows[0]);
    });
    
  });
};

module.exports = {
  authenticate: authenticate,
  listChallenges: listChallenges,
  registerUser: registerUser
};
