var mysql = require('mysql');
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

module.exports = connection;

