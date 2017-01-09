let http  = require('http');
let fs = require('fs');
let express = require('express');

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/web_dev');
mongoose.connection.on('connected', function() {
    console.log('mongo db connected.');
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

let HotFix = require('./db/hotfix');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// set static resources for express
app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/favicon.ico', function(req, res) {
  ddlog.debug('favicon req happend.');
  fs.readFile('./favicon.ico', 'binary', function(err, data) {
    res.write(data, 'binary');
    res.end();
  });
});

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
