var express = require('express');
var router = express.Router();
var cookieSession = require('cookie-session');
var database = require('../database');
var cookieParser = require('cookie-parser');

router.get('/', function(req, res){
  res.render('profile', {
    session: req.session
  });
});


// router.get('/:userId', function(req, res){
//
//   if(res.cookie('email', 'password', {signed: true})){
//     res.render('profile', {
//       message: 'you are logged in!',
//     })
//   } else {
//     res.render('/', {
//       message: 'sign up now!',
//     })
//   }
// });
//

// // //login
// router.get('/users', function(req, res) {
//   req.session.lastPage = '/users';
//   res.send('You are logged in');
// });


// req.session.name = 'users';
//
// var name = req.session.name;

//logout

module.exports = router;
