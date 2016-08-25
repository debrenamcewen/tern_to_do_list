var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieSession = require('cookie-session');
var connect = require('connect');
var expressSession = require('express-session')
var database = require('./database');
var routes = require('./routes');
var users = require('./routes/users');
var index = require('./routes/index')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1)

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession( {
  name: 'session',
  keys: [
    '056b1d48967f4592128bff207ae704550255ae97',
    '672fad7be26e1ad4a0276dc0a0c396201f28247d'
  ]
}))
app.use(function(req, res, next){
  req.loggedIn = !!req.session.userId
  req.getCurrentUser = getCurrentUser
  next()
})

const getCurrentUser = function(){
  if (this.loggedIn){
    return database.getUserById(this.session.userId)
  }else{
    return Promise.resolve(null)
  }
}

app.use('/', routes);
app.use('/users', users);

app.get('/signup', users);
app.post('/signup', users);
app.delete('/todos/:id', index);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
