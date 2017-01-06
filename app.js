let http  = require('http');
let fs = require('fs');
let express = require('express');

let app = express();
let server = http.createServer(app);

app.get('/', function(req, res) {
  fs.readFile('./index.html', 'utf-8', function(err, data) {
    res.end(data);
  });
});

server.listen(3000, function() {
  console.log('server is running on port: 3000');
});
