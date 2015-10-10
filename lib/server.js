var express = require('express');
var app = express();
var debug = require('debug')('green-space:server');
var session = require('express-session');

app.use(express.static('./public'));
app.set('view engine', 'ejs');

require('../routes')(app);



app.get('*', function(req, res){
  res.sendStatus(404);
});



var server = app.listen(process.env.PORT, process.env.IP, function() {
  var addr = server.address();
  debug("listening at %j", addr);
});
