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

var queries = [
  'CREATE TABLE users ( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, email VARCHAR(50) NOT NULL, pass_hash VARCHAR(60) NOT NULL, location VARCHAR(40), points INT(6) DEFAULT 0, greencash DECIMAL(6, 2) DEFAULT 0, description VARCHAR(200) );',
  'CREATE TABLE completed ( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, user INT(6) NOT NULL, completed BOOL DEFAULT FALSE, finished TIMESTAMP NOT NULL );',
  'CREATE TABLE challenges ( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, difficulty INT(6) DEFAULT 0, description VARCHAR(40) );',
  'INSERT INTO challenges VALUES (\'\', 0, \'Limit shower time to 8 minutes\');',
  'INSERT INTO challenges VALUES (\'\', 0, \'Turn heater down to 68 degrees (winter)\');',
  'INSERT INTO challenges VALUES (\'\', 0, \'Turn the A/C down (summer)\');',
  'INSERT INTO challenges VALUES (\'\', 0, \'Bring a bag to the grocery store\');',
  'INSERT INTO challenges VALUES (\'\', 1, \'Use cold water for washing laundry\');',
  'INSERT INTO challenges VALUES (\'\', 1, \'Use a reusable water bottle\');',
  'INSERT INTO challenges VALUES (\'\', 2, \'Take the bus to work today\');',
  'INSERT INTO challenges VALUES (\'\', 2, \'Be vegetarian for the day\');'
];

async.eachSeries(queries, function(query, fn) {
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err);
    }
    
    console.log('executing: ' + query);
    fn();
  });
}, function(err) {
  console.log('query execution complete');
  connection.end();
});
