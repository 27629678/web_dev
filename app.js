let http  = require('http');
let fs = require('fs');
let path = require('path');
let express = require('express');
var favicon = require('serve-favicon');

let HotFix = require('./db/hotfix');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/web_dev');
mongoose.connection.on('connected', function() {
    console.log('mongo db connected.');

    HotFix.findAll(function(err, items) {
      if(err) {
        return console.log(err);
      }

      items.map(function(item) {
        console.log(item.fileName());
      });
    });
});

mongoose.connection.on('error', function(err) {
    console.log('mongo db connect failed with error: ' + err + '.');
});

mongoose.connection.on('disconnected', function() {
    console.log('mongo db disconnected.');
});

let app = express();
let server = http.createServer(app);

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
