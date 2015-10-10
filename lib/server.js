var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send(200);
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Server listening');
});
