var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var lists = require('./routes/lists');
var qLocation = require('./routes/location');
var wxApi = require('./routes/wxApi');

var auth = require('./routes/wx/auth');
var getUsers = require('./routes/wx/getUsers');
var wxConfig = require('./routes/wx/config');
var users = require('./routes/users');

var app = express();

mongoose.connect('mongodb://duty:Pengcl19821025@101.200.72.54:27017/duty', {useMongoClient: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials/');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//微信签名认证
/*app.use(utils.sign(config));*/

app.use('/', index);
app.use('/lists', lists);
app.use('/wxApi', wxApi);
app.use('/wx/config', wxConfig);
app.use('/wx/auth', auth);
app.use('/wx/getUsers', getUsers);
app.use('/location', qLocation);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//sudo ng serve --proxy api.json --port 80
