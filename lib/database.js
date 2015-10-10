var mysql = require('mysql');
var config = require('../config/database');
var connection = mysql.createConnection(config);

module.exports = connection;
