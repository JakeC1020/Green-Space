#!/bin/node

var async = require('async');
var mysql = require('mysql');

var config = require('../config/database');
var connection = mysql.createConnection(config);

console.log('attempting database connection');
connection.connect(function(err) {
  if (!err) {
    console.log('database connection successful');
    return;
  }
  
  console.log('failed to connect to database');
  process.exit(1);
});

var queries = [];
