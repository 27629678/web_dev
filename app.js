let http  = require('http');
let fs = require('fs');
let express = require('express');

let app = express();
let server = http.createServer(app);

let ddlog = require('./utils/ddlog');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// set static resources for express
app.use(express.static('./public'));

app.get('/', function(req, res) {
  // fs.readFile('./index.html', 'utf-8', function(err, data) {
  //   res.end(data);
  // });
  res.render('index.ejs');
});

app.get('/favicon.ico', function(req, res) {
  ddlog.debug('favicon req happend.');
  fs.readFile('./favicon.ico', 'binary', function(err, data) {
    res.write(data, 'binary');
    res.end();
  });
});

server.listen(3000, function() {
  ddlog.info('server is running on port: 3000');
});
