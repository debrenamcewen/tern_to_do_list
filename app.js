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
// var login = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1)


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
// app.use('/login', login);
// app.get('login', login);
// app.get('todo', todo);
//

// app.use(function(req, res, next) {
//   req.session.views = (req.session.views || 0) + 1
//   res.end(req.session.views + 'views')
// })

// app.use(express.cookieParser('secretss'));
// app.use(express.bodyParser());
// app.use(cookieSession({
//   name: 'session',
//   keys: [
//     '86637a8a5169c6b2fd76b01676b039207eb5e1e0',
//     '36093fb4e8d0d4019667d519754f358eeec30b79'
//   ]
// }))

// app.get('/signup', function(req,res){
//   res.clearCookie('remember');
//   res.redirect('back');
// });

// app.use(express.cookieSession());
// app.use(app.router);

// app.use(session({}));
// app.get('/', function (req, res, next) {
//   res.end(JSON.stringify(req.cookies));
//   res.render('profile', {
//     session: req.cookies
//   })
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
