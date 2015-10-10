var express = require('express');
var app = express();

app.use(express.static('./public'));
app.set('view engine', 'ejs');

require('../routes')(app);

var server = app.listen(process.env.PORT, process.env.IP, function() {
  var addr = server.address();
  console.log("Server open at %j", addr);
});
