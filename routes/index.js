var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res){
  if (req.loggedIn){
    // database.getUserById(req.session.userId)
    req.getCurrentUser()
      .then(user => {
        res.render('profile', {
          currentUser: user
        });
      })
  }else{
    res.render('homepage');
  }
});

router.get('/login', function(req, res){
  res.render('login')
})

router.post('/login', function(req, res){
  const email = req.body.email
  const password = req.body.password
  database.authenticateUser(email, password).then(userId => {
    if (userId){
      req.session.userId = userId
      res.redirect('/')
    }else{
      res.render('login', {
        error: 'Bad email or password'
      })
    }
  })
})


router.get('/logout', function(req, res){
  req.session = null
  res.redirect('/')
})

module.exports = router;
