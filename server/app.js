let http  = require('http');
let fs = require('fs');
let path = require('path');
let express = require('express');
var favicon = require('serve-favicon');

let HotFix = require('./db/hotfix');

let app = express();
let server = http.createServer(app);

require('./db/mongodb').start();
require('./socket/client-server').createServer(server);

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

let ddlog = require('./utils/ddlog');
let upload = require('./utils/upload');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// set static resources for express
app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

// display favicon at front of page title
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

app.post('/upload-image', upload.hotfix.single('image'), function(req, res) {
  let hotfix = new HotFix();
  hotfix.name = req.file.filename;
  hotfix.mime = req.file.mimetype;
  hotfix.path = req.file.path;
  hotfix.size = req.file.size;

  hotfix.save();
  res.send({success: true});
});

server.listen(3000, function() {
  ddlog.info('server is running on port: 3000');
});
