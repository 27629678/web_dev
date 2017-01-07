let http  = require('http');
let fs = require('fs');
let express = require('express');

let app = express();
let server = http.createServer(app);

// set static resources for express
app.use(express.static('./public'));

app.get('/', function(req, res) {
  fs.readFile('./index.html', 'utf-8', function(err, data) {
    res.end(data);
  });
});

app.get('/favicon.ico', function(req, res) {
  console.log('favicon req happend.');
  fs.readFile('./favicon.ico', 'binary', function(err, data) {
    res.write(data, 'binary');
    res.end();
  });
});

server.listen(3000, function() {
  console.log('server is running on port: 3000');
});
